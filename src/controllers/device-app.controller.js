const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deviceService, gatewayService, deviceLogService } = require('../services');

const syncRealDevices = catchAsync(async (req, res) => {
  const { gatewayId, list } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  const results = [];
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  /* eslint-disable no-plusplus */
  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < list.length; i++) {
    const { dataList, ...deviceData } = list[i];
    const existingDevice = await deviceService.getDeviceByOption({ gateway: gateway._id, deviceId: deviceData.deviceId });
    if (!existingDevice) {
      const deviceBody = {
        ...deviceData,
        gateway: gateway._id,
      };
      const device = await deviceService.createDevice(deviceBody);
      results.push(device);
    } else {
      const device = await deviceService.updateDeviceById(existingDevice._id, deviceData);
      results.push(device);
    }
    if (dataList.length) {
      for (let j = 0; j < dataList.length; j++) {
        const existingDeviceLog = await deviceLogService.getDeviceLogByOption({ device: results[i]._id });
        if (!existingDeviceLog) {
          const deviceLogBody = {
            device: results[i]._id,
            list: dataList,
          };
          await deviceLogService.createDeviceLog(deviceLogBody);
        } else {
          await deviceLogService.updateDeviceLogById(existingDeviceLog._id, {
            list: dataList,
          });
        }
      }
    }
  }
  /* eslint-enable no-plusplus */
  /* eslint-enable no-await-in-loop */
  res.status(httpStatus.CREATED).send({ results, totalResults: results.length });
});

module.exports = {
  syncRealDevices,
};
