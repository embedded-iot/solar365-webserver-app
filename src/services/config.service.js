const httpStatus = require('http-status');
const { Config } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a config
 * @param {Object} configBody
 * @returns {Promise<Config>}
 */
const createConfig = async (configBody) => {
  if (await Config.isNameTaken(configBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const config = await Config.create(configBody);
  return config;
};

/**
 * Query for configs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryConfigs = async (filter, options) => {
  const configs = await Config.paginate(filter, options);
  return configs;
};

/**
 * Get config by id
 * @param {ObjectId} id
 * @returns {Promise<Config>}
 */
const getConfigById = async (id) => {
  return Config.findById(id);
};

/**
 * Get config by name
 * @param {string} name
 * @returns {Promise<Config>}
 */
const getConfigByName = async (name) => {
  return Config.findOne({ name });
};

/**
 * Get configs by options
 * @param {ObjectId} id
 * @returns {Promise<QueryResult>}
 */
const getConfigsByOption = async (option) => {
  return Config.find(option);
};

/**
 * Update config by id
 * @param {ObjectId} configId
 * @param {Object} updateBody
 * @returns {Promise<Config>}
 */
const updateConfigById = async (configId, updateBody) => {
  const config = await getConfigById(configId);
  if (!config) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Config not found');
  }
  if (updateBody.name && (await Config.isNameTaken(updateBody.name, configId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(config, updateBody);
  await config.save();
  return config;
};

/**
 * Delete config by id
 * @param {ObjectId} configId
 * @returns {Promise<Config>}
 */
const deleteConfigById = async (configId) => {
  const config = await getConfigById(configId);
  if (!config) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Config not found');
  }
  await config.remove();
  return config;
};

module.exports = {
  createConfig,
  queryConfigs,
  getConfigById,
  getConfigByName,
  updateConfigById,
  deleteConfigById,
  getConfigsByOption,
};
