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
const queryDeviceLogs = async (filter, options, populate = 'device') => {
  const deviceLogs = await DeviceLog.paginate(filter, { ...options, populate });
  return deviceLogs;
};

/**
 * Get deviceLog by id
 * @param {ObjectId} id
 * @returns {Promise<DeviceLog>}
 */
const getDeviceLogById = async (id) => {
  return DeviceLog.findById(id).populate('gateway').populate('device').exec();
};

/**
 * Get deviceLog by option
 * @param {object} option
 * @returns {Promise<DeviceLog>}
 */

const getDeviceLogByOption = async (option) => {
  return DeviceLog.findOne(option);
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
  Object.assign(deviceLog, updateBody);
  await deviceLog.save();
  return deviceLog;
};

/**
 * Create new device log or update existing
 * @param {Object} option
 * @param {Object} updateBody
 * @returns {Promise<Device>}
 */
const createAndUpdateDeviceLog = async (option, updateBody) => {
  return DeviceLog.findOneAndUpdate(option, updateBody, { upsert: true, new: true, setDefaultsOnInsert: true });
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

/**
 * Delete deviceLog by filter
 * @param {object} filter
 * @returns {}
 */
const deleteDeviceLogByFilter = async (filter) => {
  const response = await DeviceLog.deleteMany(filter);
  return response;
};

module.exports = {
  createDeviceLog,
  queryDeviceLogs,
  getDeviceLogById,
  getDeviceLogByOption,
  updateDeviceLogById,
  createAndUpdateDeviceLog,
  deleteDeviceLogById,
  deleteDeviceLogByFilter,
};
