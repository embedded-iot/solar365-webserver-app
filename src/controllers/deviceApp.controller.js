const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const i18n = require('../config/i18n');

const { deviceService, gatewayService, deviceLogService, activityLogService } = require('../services');
const {
  STATE_VALUES,
  ACTIVITY_LOG_CATEGORY_VALUES,
  ACTIVITY_LOG_TYPE_VALUES,
  DEVICE_TYPE_VALUES,
} = require('../config/constants');
const { DEVICE_DATA_ADDRESS, LOGGER_DATA_ADDRESS } = require('../config/devices');
const { groupBy } = require('../utils/cui');

const transformDeviceData = async (deviceType, dataList = []) => {
  if (deviceType === DEVICE_TYPE_VALUES.INVERTER || deviceType === DEVICE_TYPE_VALUES.LOGGER) {
    const dataAddressMap = deviceType === DEVICE_TYPE_VALUES.INVERTER ? DEVICE_DATA_ADDRESS : LOGGER_DATA_ADDRESS;
    const convertedDataAddress = dataAddressMap.map((dataAddress) => {
      const addressArr = dataAddress.address.split('-');
      return {
        ...dataAddress,
        startAddress: addressArr.length >= 1 ? addressArr[0] : -1,
        // eslint-disable-next-line no-nested-ternary
        endAddress: addressArr.length >= 1 ? addressArr[addressArr.length >= 2 ? 1 : 0] : -1,
      };
    });
    const convertedDataList = dataList
      .map((data) => {
        const existingDataAddress =
          convertedDataAddress.find(
            (dataAddress) =>
              dataAddress.startAddress <= data.address.toString() && dataAddress.endAddress >= data.address.toString()
          ) || {};
        return {
          address: data.address,
          value: data.value,
          name: existingDataAddress.name,
          group: existingDataAddress.address,
          unit: existingDataAddress.unit,
          dataType: existingDataAddress.dataType,
        };
      })
      .filter((data) => !!data.group);
    const groupedDataList = groupBy(convertedDataList, (item) => item.group);
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [, value] of groupedDataList.entries()) {
      result.push({
        name: value[0].name,
        unit: value[0].unit,
        dataType: value[0].dataType,
        value: value.map((dataAddress) => dataAddress.value).join(''),
        address: value.map((dataAddress) => dataAddress.address[0].toString()),
      });
    }
    return result.filter((deviceData) => deviceData.name !== 'Reserved');
  }
  return dataList.filter((deviceData) => deviceData.name !== 'Reserved');
};

const syncRealDevices = catchAsync(async (req, res) => {
  const list = req.body;
  const { gatewayId } = req.params;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  await gatewayService.updateGatewaysByOption(
    { gatewayId },
    {
      state: STATE_VALUES.ONLINE,
      updatedStateAt: Date.now(),
    }
  );
  const results = await Promise.all(
    list.map(async (deviceData) => {
      const device = await deviceService.createAndUpdateDevice(
        { gateway: gateway._id, deviceId: deviceData.deviceId },
        {
          ...deviceData,
          gateway: gateway._id,
        }
      );
      const transformedDataList = await transformDeviceData(device.type, deviceData.dataList);
      const deviceLog = await deviceLogService.createAndUpdateDeviceLog(
        { device: device._id },
        {
          device: device._id,
          list: transformedDataList,
        }
      );
      return {
        ...device.toJSON(),
        deviceLogs: deviceLog.toJSON().list,
      };
    })
  );
  const activityLogBody = {
    gateway: gateway._id,
    category: ACTIVITY_LOG_CATEGORY_VALUES.GATEWAY,
    type: ACTIVITY_LOG_TYPE_VALUES.SUCCESS,
    description: i18n.SYNC_GATEWAY_DATA_SUCCESSFULLY,
    details: gateway._id,
  };
  await activityLogService.createActivityLog(activityLogBody);
  res.status(httpStatus.CREATED).send({ results, totalResults: results.length });
});

const getGatewaySettings = catchAsync(async (req, res) => {
  const { gatewayId } = req.params;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  res.send(gateway.toJSON().settings);
});

module.exports = {
  syncRealDevices,
  getGatewaySettings,
};
