const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deviceLogService } = require('../services');

const createDeviceLog = catchAsync(async (req, res) => {
  const deviceLog = await deviceLogService.createDeviceLog(req.body);
  res.status(httpStatus.CREATED).send(deviceLog);
});

const getDeviceLogs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['deviceLogId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
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
  const deviceLog = await deviceLogService.updateDeviceLogById(req.params.deviceLogId, req.body);
  res.send(deviceLog);
});

const deleteDeviceLog = catchAsync(async (req, res) => {
  await deviceLogService.deleteDeviceLogById(req.params.deviceLogId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDeviceLog,
  getDeviceLogs,
  getDeviceLog,
  updateDeviceLog,
  deleteDeviceLog,
};
