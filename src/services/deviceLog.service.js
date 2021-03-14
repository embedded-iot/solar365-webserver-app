const httpStatus = require('http-status');
const { DeviceLog } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a device log
 * @param {Object} deviceLogBody
 * @returns {Promise<DeviceLog>}
 */
const createDeviceLog = async (deviceLogBody) => {
  // if (await DeviceLog.isDeviceLogNameTaken(deviceLogBody.name)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'DeviceLog name already taken');
  // }
  const deviceLog = await DeviceLog.create(deviceLogBody);
  return deviceLog;
};

/**
 * Query for deviceLogs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDeviceLogs = async (filter, options) => {
  const deviceLogs = await DeviceLog.paginate(filter, { ...options, populate: 'master,device' });
  return deviceLogs;
};

/**
 * Get deviceLog by id
 * @param {ObjectId} id
 * @returns {Promise<DeviceLog>}
 */
const getDeviceLogById = async (id) => {
  return DeviceLog.findById(id).populate('master').populate('device').exec();
};

/**
 * Get deviceLog by name
 * @param {string} name
 * @returns {Promise<DeviceLog>}
 */
const getDeviceLogByDeviceID = async (deviceId) => {
  return DeviceLog.findOne({ deviceId }).populate('master').populate('device').exec();
};

/**
 * Update deviceLog by id
 * @param {ObjectId} deviceLogId
 * @param {Object} updateBody
 * @returns {Promise<DeviceLog>}
 */
const updateDeviceLogById = async (deviceLogId, updateBody) => {
  const deviceLog = await getDeviceLogById(deviceLogId);
  if (!deviceLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DeviceLog not found');
  }
  if (updateBody.name && (await DeviceLog.isDeviceLogNameTaken(updateBody.name, deviceLogId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'DeviceLog name already taken');
  }
  Object.assign(deviceLog, updateBody);
  await deviceLog.save();
  return deviceLog;
};

/**
 * Delete deviceLog by id
 * @param {ObjectId} deviceLogId
 * @returns {Promise<DeviceLog>}
 */
const deleteDeviceLogById = async (deviceLogId) => {
  const deviceLog = await getDeviceLogById(deviceLogId);
  if (!deviceLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DeviceLog not found');
  }
  await deviceLog.remove();
  return deviceLog;
};

module.exports = {
  createDeviceLog,
  queryDeviceLogs,
  getDeviceLogById,
  getDeviceLogByDeviceID,
  updateDeviceLogById,
  deleteDeviceLogById,
};
