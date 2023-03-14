const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { faultService, gatewayService, deviceService, projectService } = require('../services');

const createFault = catchAsync(async (req, res) => {
  const { gatewayId, deviceId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const device = await deviceService.getDeviceByOption({ gateway: gateway._id, deviceId });
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, `Device not found in ${gatewayId}`);
  }

  const faultBody = {
    ...body,
    device: device._id,
  };
  const fault = await faultService.createFault(faultBody);
  res.status(httpStatus.CREATED).send(fault);
});

const getFaults = catchAsync(async (req, res) => {
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
  if (!gatewayId && deviceId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway can"t empty when there has device id');
  } else if (gatewayId && !gatewayIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const deviceOptions = { gateway: { $in: gatewayIds } };
  if (deviceId) {
    deviceOptions.deviceId = deviceId;
  }
  const devices = await deviceService.getDevicesByOption(deviceOptions);
  const deviceIds = await devices.map((device) => device._id);
  if (deviceId && !deviceIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  const filter = {
    device: {
      $in: deviceIds,
    },
  };

  const result = await faultService.queryFaults(filter, options);
  res.send(result);
});

const getFault = catchAsync(async (req, res) => {
  const fault = await faultService.getFaultById(req.params.faultId);
  if (!fault) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fault not found');
  }
  res.send(fault);
});

const updateFault = catchAsync(async (req, res) => {
  const { gatewayId, deviceId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const device = await deviceService.getDeviceByOption({ gateway: gateway._id, deviceId });
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, `Device not found in ${gatewayId}`);
  }
  const fault = await faultService.updateFaultById(req.params.faultId, body);
  res.send(fault);
});

const deleteFault = catchAsync(async (req, res) => {
  await faultService.deleteFaultById(req.params.faultId);
  res.status(httpStatus.NO_CONTENT).send();
});

const clearData = async (filter) => {
  // eslint-disable-next-line no-return-await
  return await faultService.deleteStatisticsByFilter(filter);
};

const getFaultsManagement = catchAsync(async (req, res) => {
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
  if (!gatewayId && deviceId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway can"t empty when there has device id');
  } else if (gatewayId && !gatewayIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const deviceOptions = { gateway: { $in: gatewayIds } };
  if (deviceId) {
    deviceOptions.deviceId = deviceId;
  }
  const devices = await deviceService.getDevicesByOption(deviceOptions);
  const deviceIds = await devices.map((device) => device._id);
  if (deviceId && !deviceIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  const filter = {
    device: {
      $in: deviceIds,
    },
  };

  const result = await faultService.queryFaults(filter, options);
  res.send(result);
});

module.exports = {
  createFault,
  getFaults,
  getFault,
  updateFault,
  deleteFault,
  getFaultsManagement,
  clearData,
};
