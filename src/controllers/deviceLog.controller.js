const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deviceLogService, masterService, deviceService } = require('../services');

const createDeviceLog = catchAsync(async (req, res) => {
  const { masterKey, deviceId, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const device = await deviceService.getDeviceByOption({ master: master._id, deviceId });
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, `Device not found in ${masterKey}`);
  }
  const deviceLogBody = {
    ...body,
    master: master._id,
    device: device._id,
  };
  const deviceLog = await deviceLogService.createDeviceLog(deviceLogBody);
  res.status(httpStatus.CREATED).send(deviceLog);
});

const getDeviceLogs = catchAsync(async (req, res) => {
  const filter = {};
  const { masterKey, deviceId, from, to } = pick(req.query, ['masterKey', 'deviceId', 'from', 'to']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (masterKey) {
    const master = await masterService.getMasterByOption({ masterKey });
    if (!master) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    filter.master = master._id;
  }

  if (deviceId) {
    const device = await deviceService.getDeviceByOption({ deviceId });
    if (!device) {
      throw new ApiError(httpStatus.NOT_FOUND, `Device not found`);
    }
    filter.device = device._id;
  }

  if (from) {
    filter.updatedAt = {
      $gt: new Date(from),
      $lt: new Date(to || new Date()),
    };
  }

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
  const { masterKey, deviceId, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const device = await deviceService.getDeviceByOption({ master: master._id, deviceId });
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, `Device not found in ${masterKey}`);
  }
  const deviceLog = await deviceLogService.updateDeviceLogById(req.params.deviceLogId, body);
  res.send(deviceLog);
});

const deleteDeviceLog = catchAsync(async (req, res) => {
  await deviceLogService.deleteDeviceLogById(req.params.deviceLogId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getLatestDeviceLog = catchAsync(async (req, res) => {
  const filter = {};
  const { masterKey, deviceId } = pick(req.query, ['masterKey', 'deviceId']);
  if (masterKey) {
    const master = await masterService.getMasterByOption({ masterKey });
    if (!master) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    filter.master = master._id;
  }

  if (deviceId) {
    const device = await deviceService.getDeviceByOption({ deviceId });
    if (!device) {
      throw new ApiError(httpStatus.NOT_FOUND, `Device not found`);
    }
    filter.device = device._id;
  }
  const result = await deviceLogService.queryDeviceLogs(filter, { sortBy: 'updatedAt:desc', limit: 1 });
  const deviceLog = result.results.length ? result.results[0] : null;
  if (!deviceLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DeviceLog not found');
  }
  res.send(deviceLog);
});

const getStatisticDeviceLogs = catchAsync(async (req, res) => {
  const filter = {};
  const { masterKey, deviceId, from, to, dataName } = pick(req.query, ['masterKey', 'deviceId', 'from', 'to', 'dataName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (masterKey) {
    const master = await masterService.getMasterByOption({ masterKey });
    if (!master) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    filter.master = master._id;
  }

  if (deviceId) {
    const device = await deviceService.getDeviceByOption({ deviceId });
    if (!device) {
      throw new ApiError(httpStatus.NOT_FOUND, `Device not found`);
    }
    filter.device = device._id;
  }

  if (from) {
    filter.updatedAt = {
      $gt: new Date(from),
      $lt: new Date(to || new Date()),
    };
  }

  const result = await deviceLogService.queryDeviceLogs(filter, options);
  result.results = result.results.map((deviceLog) => {
    const filteredDeviceLog = deviceLog.deviceLogData.find((deviceLogData) => deviceLogData.data_name === dataName) || {};
    const filteredDeviceLogIO =
      (!Object.keys(filteredDeviceLog).length &&
        deviceLog.deviceLogIOData.find((deviceLogIOData) => deviceLogIOData.name === dataName)) ||
      {};
    return {
      date: deviceLog.updatedAt,
      ...filteredDeviceLog,
      ...filteredDeviceLogIO,
    };
  });
  result.dataName = dataName;
  res.send(result);
});

module.exports = {
  createDeviceLog,
  getDeviceLogs,
  getDeviceLog,
  updateDeviceLog,
  deleteDeviceLog,
  getLatestDeviceLog,
  getStatisticDeviceLogs,
};
