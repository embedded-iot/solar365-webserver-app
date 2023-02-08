const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deviceService, gatewayService } = require('../services');

const createDevice = catchAsync(async (req, res) => {
  const { gatewayId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const deviceBody = {
    ...body,
    deviceId: body.deviceData.dev_id,
    gateway: gateway._id,
  };
  const device = await deviceService.createDevice(deviceBody);
  res.status(httpStatus.CREATED).send(device);
});

const getDevices = catchAsync(async (req, res) => {
  const { gatewayId, ...filter } = pick(req.query, ['gatewayId', 'name']);
  if (gatewayId) {
    const gateway = await gatewayService.getGatewayByOption({ gatewayId });
    if (!gateway) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
    }
    filter.gateway = gateway._id;
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await deviceService.queryDevices(filter, options);
  res.send(result);
});

const getDevice = catchAsync(async (req, res) => {
  const device = await deviceService.getDeviceById(req.params.deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  res.send(device);
});

const updateDevice = catchAsync(async (req, res) => {
  const { gatewayId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const deviceBody = {
    ...body,
    deviceId: body.deviceData.dev_id,
    gateway: gateway._id,
  };
  const device = await deviceService.updateDeviceById(req.params.deviceId, deviceBody);
  res.send(device);
});

const deleteDevice = catchAsync(async (req, res) => {
  await deviceService.deleteDeviceById(req.params.deviceId);
  res.status(httpStatus.NO_CONTENT).send();
});

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
    const deviceData = list[i];
    const existingDevice = await deviceService.getDeviceByOption({ gateway: gateway._id, deviceId: deviceData.dev_id });
    if (!existingDevice) {
      const deviceBody = {
        gateway: gateway._id,
        deviceId: deviceData.dev_id,
        name: `${deviceData.dev_name} ${deviceData.dev_id}`,
        deviceData,
      };
      const device = await deviceService.createDevice(deviceBody);
      results.push(device);
    } else {
      existingDevice.deviceData = deviceData;
      const device = await deviceService.updateDeviceById(existingDevice._id, existingDevice);
      results.push(device);
    }
  }
  /* eslint-enable no-plusplus */
  /* eslint-enable no-await-in-loop */
  res.status(httpStatus.CREATED).send({ results, totalResults: results.length });
});

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice,
  syncRealDevices,
};
