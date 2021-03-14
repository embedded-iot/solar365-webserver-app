const httpStatus = require('http-status');
const { Fault } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a fault
 * @param {Object} faultBody
 * @returns {Promise<Fault>}
 */
const createFault = async (faultBody) => {
  // if (await Fault.isFaultNameTaken(faultBody.name)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Fault name already taken');
  // }
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
  const faults = await Fault.paginate(filter, { ...options, populate: 'master' });
  return faults;
};

/**
 * Get fault by id
 * @param {ObjectId} id
 * @returns {Promise<Fault>}
 */
const getFaultById = async (id) => {
  return Fault.findById(id).populate('master').exec();
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

module.exports = {
  createFault,
  queryFaults,
  getFaultById,
  updateFaultById,
  deleteFaultById,
};
