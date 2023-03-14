const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deviceLogService, gatewayService, deviceService, projectService } = require('../services');

const createDeviceLog = catchAsync(async (req, res) => {
  const { gatewayId, deviceId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const device = await deviceService.getDeviceByOption({ gateway: gateway._id, deviceId });
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, `Device not found in ${gatewayId}`);
  }
  const deviceLogBody = {
    ...body,
    device: device._id,
  };
  const deviceLog = await deviceLogService.createDeviceLog(deviceLogBody);
  res.status(httpStatus.CREATED).send(deviceLog);
});

const getDeviceLogs = catchAsync(async (req, res) => {
  const { gatewayId, deviceId } = pick(req.query, ['gatewayId', 'deviceId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const projects = await projectService.getProjectsByOption({ user: req.user._id });
  const projectIds = await projects.map((project) => project._id);
  const gatewayOptions = { project: { $in: projectIds } };
  if (gatewayId) {
    gatewayOptions.gatewayId = gatewayId;
  }
  const gateways = await gatewayService.getGatewaysByOption(gatewayOptions);
  const gatewayIds = await gateways.map((gateway) => gateway._id);
  if (gatewayId && !gatewayIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const deviceOptions = { gateway: { $in: gatewayIds } };
  if (deviceId) {
    deviceOptions.deviceId = deviceId;
  }
  const devices = await deviceService.getDevicesByOption(deviceOptions);
  const deviceIds = await devices.map((device) => device._id);
  if (!gatewayId && deviceId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway can"t empty when there has device id');
  } else if (deviceId && !deviceIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  const filter = {
    device: {
      $in: deviceIds,
    },
  };
  const result = await deviceLogService.queryDeviceLogs(filter, options);
  res.send(result);
});

const getDeviceLog = catchAsync(async (req, res) => {
  const deviceLog = await deviceLogService.getDeviceLogById(req.params.deviceLogId);
  if (!deviceLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DeviceLog not found');
  }
  res.send(deviceLog);
});

const updateDeviceLog = catchAsync(async (req, res) => {
  const { gatewayId, deviceId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const device = await deviceService.getDeviceByOption({ gateway: gateway._id, deviceId });
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, `Device not found in ${gatewayId}`);
  }
  const deviceLog = await deviceLogService.updateDeviceLogById(req.params.deviceLogId, body);
  res.send(deviceLog);
});

const deleteDeviceLog = catchAsync(async (req, res) => {
  await deviceLogService.deleteDeviceLogById(req.params.deviceLogId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getDeviceLogsManagement = catchAsync(async (req, res) => {
  const { gatewayId, deviceId } = pick(req.query, ['gatewayId', 'deviceId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const projects = await projectService.getProjectsByOption({});
  const projectIds = await projects.map((project) => project._id);
  const gatewayOptions = { project: { $in: projectIds } };
  if (gatewayId) {
    gatewayOptions.gatewayId = gatewayId;
  }
  const gateways = await gatewayService.getGatewaysByOption(gatewayOptions);
  const gatewayIds = await gateways.map((gateway) => gateway._id);
  if (gatewayId && !gatewayIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const deviceOptions = { gateway: { $in: gatewayIds } };
  if (deviceId) {
    deviceOptions.deviceId = deviceId;
  }
  const devices = await deviceService.getDevicesByOption(deviceOptions);
  const deviceIds = await devices.map((device) => device._id);
  if (!gatewayId && deviceId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway can"t empty when there has device id');
  } else if (deviceId && !deviceIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  const filter = {
    device: {
      $in: deviceIds,
    },
  };
  const result = await deviceLogService.queryDeviceLogs(filter, options);
  res.send(result);
});

module.exports = {
  createDeviceLog,
  getDeviceLogs,
  getDeviceLog,
  updateDeviceLog,
  deleteDeviceLog,
  getDeviceLogsManagement,
};
