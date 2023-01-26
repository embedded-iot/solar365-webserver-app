const httpStatus = require('http-status');
const { Master } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a master
 * @param {Object} masterBody
 * @returns {Promise<Master>}
 */
const createMaster = async (masterBody) => {
  if (await Master.isMasterKeyTaken(masterBody.masterKey)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Master key already taken');
  }
  const master = await Master.create(masterBody);
  return master;
};

/**
 * Query for masters
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMasters = async (filter, options) => {
  const masters = await Master.paginate(filter, options);
  return masters;
};

/**
 * Get master by option
 * @param {Object} option
 * @returns {Promise<Master>}
 */
const getMasterByOption = async (option) => {
  return Master.findOne(option);
};

/**
 * Update master by Option
 * @param {{_id: *, user: *}} option
 * @param {Object} updateBody
 * @returns {Promise<Master>}
 */
const updateMasterByOption = async (option, updateBody) => {
  const master = await getMasterByOption(option);
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  if (updateBody.masterKey && (await Master.isMasterKeyTaken(updateBody.masterKey, option._id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Master key already taken');
  }
  Object.assign(master, updateBody);
  await master.save();
  return master;
};

/**
 * Delete master by id
 * @param {{_id: *, user: *}} option
 * @returns {Promise<Master>}
 */
const deleteMasterByOption = async (option) => {
  const master = await getMasterByOption(option);
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  await master.remove();
  return master;
};

module.exports = {
  createMaster,
  queryMasters,
  getMasterByOption,
  updateMasterByOption,
  deleteMasterByOption,
};
