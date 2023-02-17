const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deviceService, gatewayService, deviceLogService } = require('../services');
const { STATE_VALUES } = require('../config/constants');

const syncRealDevices = catchAsync(async (req, res) => {
  const { gatewayId, list } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  const results = [];
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
  /* eslint-disable no-plusplus */
  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < list.length; i++) {
    const { dataList, ...deviceData } = list[i];
    const existingDevice = await deviceService.getDeviceByOption({ gateway: gateway._id, deviceId: deviceData.deviceId });
    let selectedDevice = null;
    if (!existingDevice) {
      const deviceBody = {
        ...deviceData,
        gateway: gateway._id,
      };
      selectedDevice = await deviceService.createDevice(deviceBody);
    } else {
      selectedDevice = await deviceService.updateDeviceById(existingDevice._id, deviceData);
    }
    const deviceLogList = [];
    if (dataList.length) {
      for (let j = 0; j < dataList.length; j++) {
        let selectedDeviceLog = null;
        const existingDeviceLog = await deviceLogService.getDeviceLogByOption({ device: selectedDevice._id });
        if (!existingDeviceLog) {
          const deviceLogBody = {
            device: selectedDevice._id,
            list: dataList,
          };
          selectedDeviceLog = await deviceLogService.createDeviceLog(deviceLogBody);
        } else {
          selectedDeviceLog = await deviceLogService.updateDeviceLogById(existingDeviceLog._id, {
            list: dataList,
          });
        }
        deviceLogList.push(selectedDeviceLog);
      }
    }
    results.push({
      ...selectedDevice.toJSON(),
      dataList: deviceLogList,
    });
  }
  /* eslint-enable no-plusplus */
  /* eslint-enable no-await-in-loop */
  res.status(httpStatus.CREATED).send({ results, totalResults: results.length });
});

module.exports = {
  syncRealDevices,
};
