const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { faultService, gatewayService, deviceService } = require('../services');
const config = require('../config/config');

const transformFault = ({ gateway, device, faultData, ...fault }) => {
  return {
    ...fault,
    faultData,
    gatewayName: (gateway && gateway.name) || '',
    deviceName: (device && device.name) || '',
  };
};

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
    gateway: gateway._id,
    device: device._id,
  };
  const fault = await faultService.createFault(faultBody);
  res.status(httpStatus.CREATED).send(fault);
});

const getFaults = catchAsync(async (req, res) => {
  const filter = {};
  const { gatewayId, from, to } = pick(req.query, ['gatewayId', 'from', 'to']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.sortBy = options.sortBy || 'updatedAt:desc';
  if (gatewayId) {
    const gateway = await gatewayService.getGatewayByOption({ gatewayId });
    if (!gateway) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
    }
    filter.gateway = gateway._id;
  }

  if (from) {
    filter.updatedAt = {
      $gt: new Date(from),
      $lt: new Date(to || new Date()),
    };
  }

  const result = await faultService.queryFaults(filter, options);
  result.results = result.results.map((fault) => transformFault(fault.toJSON()));
  res.send(result);
});

const getFault = catchAsync(async (req, res) => {
  const fault = await faultService.getFaultById(req.params.faultId);
  if (!fault) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fault not found');
  }
  res.send(transformFault(fault.toJSON()));
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
  const faultBody = {
    ...body,
    gateway: gateway._id,
    device: device._id,
  };
  const fault = await faultService.updateFaultById(req.params.faultId, faultBody);
  res.send(fault);
});

const deleteFault = catchAsync(async (req, res) => {
  await faultService.deleteFaultById(req.params.faultId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getLatestFault = catchAsync(async (req, res) => {
  const filter = {};
  const { gatewayId } = pick(req.query, ['gatewayId']);
  if (gatewayId) {
    const gateway = await gatewayService.getGatewayByOption({ gatewayId });
    if (!gateway) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
    }
    filter.gateway = gateway._id;
  }

  const today = new Date();
  const yesterday = new Date();
  yesterday.setMinutes(today.getMinutes() - config.latestUploadedDataMinutes);
  filter.updatedAt = {
    $gt: yesterday,
    $lt: today,
  };

  const result = await faultService.queryFaults(filter, { sortBy: 'updatedAt:desc', limit: 1 });
  const fault = result.results.length ? result.results[0].toJSON() : null;
  if (!fault) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ActivityLog not found');
  }
  res.send(transformFault(fault));
});

const clearData = async (filter) => {
  // eslint-disable-next-line no-return-await
  return await faultService.deleteStatisticsByFilter(filter);
};

module.exports = {
  createFault,
  getFaults,
  getFault,
  updateFault,
  deleteFault,
  getLatestFault,
  clearData,
};
