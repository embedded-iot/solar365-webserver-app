const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { faultService, masterService, deviceService } = require('../services');
const config = require('../config/config');

const transformFault = ({ master, device, faultData, ...fault }) => {
  return {
    ...fault,
    faultData,
    masterName: (master && master.name) || '',
    deviceName: (device && device.name) || '',
  };
};

const createFault = catchAsync(async (req, res) => {
  const { masterKey, deviceId, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const device = await deviceService.getDeviceByOption({ master: master._id, deviceId });
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, `Device not found in ${masterKey}`);
  }

  const faultBody = {
    ...body,
    master: master._id,
    device: device._id,
  };
  const fault = await faultService.createFault(faultBody);
  res.status(httpStatus.CREATED).send(fault);
});

const getFaults = catchAsync(async (req, res) => {
  const filter = {};
  const { masterKey, from, to } = pick(req.query, ['masterKey', 'from', 'to']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.sortBy = options.sortBy || 'updatedAt:desc';
  if (masterKey) {
    const master = await masterService.getMasterByOption({ masterKey });
    if (!master) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    filter.master = master._id;
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
  const { masterKey, deviceId, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const device = await deviceService.getDeviceByOption({ master: master._id, deviceId });
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, `Device not found in ${masterKey}`);
  }
  const faultBody = {
    ...body,
    master: master._id,
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
  const { masterKey } = pick(req.query, ['masterKey']);
  if (masterKey) {
    const master = await masterService.getMasterByOption({ masterKey });
    if (!master) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    filter.master = master._id;
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
