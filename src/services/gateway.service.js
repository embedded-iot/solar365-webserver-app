const httpStatus = require('http-status');
const { Gateway } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a gateway
 * @param {Object} gatewayBody
 * @returns {Promise<Gateway>}
 */
const createGateway = async (gatewayBody) => {
  if (await Gateway.isGatewayIdTaken(gatewayBody.gatewayId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Gateway id already taken');
  }
  const gateway = await Gateway.create(gatewayBody);
  return gateway;
};

/**
 * Query for gateways
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryGateways = async (filter, options) => {
  const gateways = await Gateway.paginate(filter, options);
  return gateways;
};

/**
 * Get gateway by option
 * @param {Object} option
 * @returns {Promise<Gateway>}
 */
const getGatewayByOption = async (option) => {
  const gateway = await Gateway.findOne(option);
  return gateway;
};

/**
 * Get gateways by option
 * @param {Object} option
 * @returns {Promise<Gateway>}
 */
const getGatewaysByOption = async (option) => {
  return Gateway.find(option);
};

/**
 * Update gateway by Option
 * @param {{_id: *, user: *}} option
 * @param {Object} updateBody
 * @returns {Promise<Gateway>}
 */
const updateGatewayByOption = async (option, updateBody) => {
  const gateway = await getGatewayByOption(option);
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  if (updateBody.gatewayId && (await Gateway.isGatewayIdTaken(updateBody.gatewayId, option._id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Gateway id already taken');
  }
  Object.assign(gateway, updateBody);
  await gateway.save();
  return gateway;
};

/**
 * Update gateways by Option
 * @param {{_id: *, user: *}} option
 * @param {Object} updateBody
 * @returns {Promise<Gateway>}
 */
const updateGatewaysByOption = async (option, updateBody) => {
  const gateway = await Gateway.updateMany(option, updateBody);
  return gateway;
};

/**
 * Delete gateway by id
 * @param {{_id: *, user: *}} option
 * @returns {Promise<Gateway>}
 */
const deleteGatewayByOption = async (option) => {
  const gateway = await getGatewayByOption(option);
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  await gateway.remove();
  return gateway;
};

module.exports = {
  createGateway,
  queryGateways,
  getGatewayByOption,
  getGatewaysByOption,
  updateGatewayByOption,
  updateGatewaysByOption,
  deleteGatewayByOption,
};
