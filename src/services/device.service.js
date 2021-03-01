const httpStatus = require('http-status');
const { Device } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a device
 * @param {Object} deviceBody
 * @returns {Promise<Device>}
 */
const createDevice = async (deviceBody) => {
  if (await Device.isDeviceNameTaken(deviceBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Device name already taken');
  } else if (await Device.isDeviceNameTaken(deviceBody.deviceId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Device id already taken');
  }
  const device = await Device.create(deviceBody);
  return device;
};

/**
 * Query for devices
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDevices = async (filter, options) => {
  const devices = await Device.paginate(filter, options);
  return devices;
};

/**
 * Get device by id
 * @param {ObjectId} id
 * @returns {Promise<Device>}
 */
const getDeviceById = async (id) => {
  return Device.findById(id);
};

/**
 * Get device by Option
 * @param {Object} option
 * @returns {Promise<Device>}
 */
const getDeviceByOption = async (option) => {
  return Device.findOne(option);
};

/**
 * Get device by name
 * @param {string} name
 * @returns {Promise<Device>}
 */
const getDeviceByName = async (name) => {
  return Device.findOne({ name });
};

/**
 * Update device by id
 * @param {ObjectId} deviceId
 * @param {Object} updateBody
 * @returns {Promise<Device>}
 */
const updateDeviceById = async (deviceId, updateBody) => {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  } else if (await Device.isDeviceNameTaken(updateBody.deviceId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Device id already taken');
  }
  if (updateBody.name && (await Device.isDeviceNameTaken(updateBody.name, deviceId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Device name already taken');
  }
  Object.assign(device, updateBody);
  await device.save();
  return device;
};

/**
 * Delete device by id
 * @param {ObjectId} deviceId
 * @returns {Promise<Device>}
 */
const deleteDeviceById = async (deviceId) => {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  await device.remove();
  return device;
};

module.exports = {
  createDevice,
  queryDevices,
  getDeviceById,
  getDeviceByOption,
  getDeviceByName,
  updateDeviceById,
  deleteDeviceById,
};
