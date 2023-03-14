const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deviceService, gatewayService, projectService } = require('../services');
const { getSearchOptions } = require('../utils/search.service');

const createDevice = catchAsync(async (req, res) => {
  const { gatewayId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const deviceBody = {
    ...body,
    gateway: gateway._id,
  };
  const device = await deviceService.createDevice(deviceBody);
  res.status(httpStatus.CREATED).send(device);
});

const getDevices = catchAsync(async (req, res) => {
  const { gatewayId, keyword } = pick(req.query, ['gatewayId', 'keyword']);
  const searchOptions = getSearchOptions(keyword, ['name']);
  const projects = await projectService.getProjectsByOption({ user: req.user._id });
  const projectIds = await projects.map((project) => project._id);
  const gatewayOptions = { project: { $in: projectIds } };
  if (gatewayId) {
    gatewayOptions.gatewayId = gatewayId;
  }
  const gateways = await gatewayService.getGatewaysByOption(gatewayOptions);
  const gatewayIds = await gateways.map((gateway) => gateway._id);
  if (!gatewayIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const filter = {
    ...searchOptions,
    gateway: {
      $in: gatewayIds,
    },
  };
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
    gateway: gateway._id,
  };
  const device = await deviceService.updateDeviceById(req.params.deviceId, deviceBody);
  res.send(device);
});

const deleteDevice = catchAsync(async (req, res) => {
  await deviceService.deleteDeviceById(req.params.deviceId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getDevicesManagement = catchAsync(async (req, res) => {
  const { gatewayId, keyword } = pick(req.query, ['gatewayId', 'keyword']);
  const searchOptions = getSearchOptions(keyword, ['name']);
  const projects = await projectService.getProjectsByOption({});
  const projectIds = await projects.map((project) => project._id);
  const gatewayOptions = { project: { $in: projectIds } };
  if (gatewayId) {
    gatewayOptions.gatewayId = gatewayId;
  }
  const gateways = await gatewayService.getGatewaysByOption(gatewayOptions);
  const gatewayIds = await gateways.map((gateway) => gateway._id);
  if (!gatewayIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const filter = {
    ...searchOptions,
    gateway: {
      $in: gatewayIds,
    },
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await deviceService.queryDevices(filter, options);
  res.send(result);
});

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice,
  getDevicesManagement,
};
