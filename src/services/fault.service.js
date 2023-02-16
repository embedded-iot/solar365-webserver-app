const httpStatus = require('http-status');
const { Fault } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a fault
 * @param {Object} faultBody
 * @returns {Promise<Fault>}
 */
const createFault = async (faultBody) => {
  const fault = await Fault.create(faultBody);
  return fault;
};

/**
 * Query for faults
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFaults = async (filter, options) => {
  const faults = await Fault.paginate(filter, { ...options, populate: 'device' });
  return faults;
};

/**
 * Get fault by id
 * @param {ObjectId} id
 * @returns {Promise<Fault>}
 */
const getFaultById = async (id) => {
  return Fault.findById(id).populate('device').exec();
};

/**
 * Update fault by id
 * @param {ObjectId} faultId
 * @param {Object} updateBody
 * @returns {Promise<Fault>}
 */
const updateFaultById = async (faultId, updateBody) => {
  const fault = await getFaultById(faultId);
  if (!fault) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fault not found');
  }
  Object.assign(fault, updateBody);
  await fault.save();
  return fault;
};

/**
 * Delete fault by id
 * @param {ObjectId} faultId
 * @returns {Promise<Fault>}
 */
const deleteFaultById = async (faultId) => {
  const fault = await getFaultById(faultId);
  if (!fault) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fault not found');
  }
  await fault.remove();
  return fault;
};

/**
 * Get latest fault
 * @param {Object} filter
 * @returns {Promise<Statistic>}
 */
const getLatestFaults = async (filter = {}) => {
  const result = await queryFaults(filter, { sortBy: 'updatedAt:desc', limit: 100 });
  return result;
};

/**
 * Delete faults by filter
 * @param {object} filter
 * @returns {}
 */
const deleteFaultsByFilter = async (filter) => {
  const response = await Fault.deleteMany(filter);
  return response;
};

module.exports = {
  createFault,
  queryFaults,
  getFaultById,
  updateFaultById,
  deleteFaultById,
  getLatestFaults,
  deleteFaultsByFilter,
};
