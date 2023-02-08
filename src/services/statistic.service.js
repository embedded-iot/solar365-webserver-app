const httpStatus = require('http-status');
const { Statistic } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a statistic
 * @param {Object} statisticBody
 * @returns {Promise<Statistic>}
 */
const createStatistic = async (statisticBody) => {
  // if (await Statistic.isStatisticNameTaken(statisticBody.name)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Statistic name already taken');
  // }
  const statistic = await Statistic.create(statisticBody);
  return statistic;
};

/**
 * Query for statistics
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStatistics = async (filter, options) => {
  const statistics = await Statistic.paginate(filter, { ...options, populate: 'gateway' });
  return statistics;
};

/**
 * Get statistic by id
 * @param {ObjectId} id
 * @returns {Promise<Statistic>}
 */
const getStatisticById = async (id) => {
  return Statistic.findById(id).populate('gateway').exec();
};

/**
 * Update statistic by id
 * @param {ObjectId} statisticId
 * @param {Object} updateBody
 * @returns {Promise<Statistic>}
 */
const updateStatisticById = async (statisticId, updateBody) => {
  const statistic = await getStatisticById(statisticId);
  if (!statistic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statistic not found');
  }
  Object.assign(statistic, updateBody);
  await statistic.save();
  return statistic;
};

/**
 * Delete statistic by id
 * @param {ObjectId} statisticId
 * @returns {Promise<Statistic>}
 */
const deleteStatisticById = async (statisticId) => {
  const statistic = await getStatisticById(statisticId);
  if (!statistic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statistic not found');
  }
  await statistic.remove();
  return statistic;
};

/**
 * Get latest statistic
 * @param {Object} filter
 * @returns {Promise<Statistic>}
 */
const getLatestStatistic = async (filter = {}) => {
  const result = await queryStatistics(filter, { sortBy: 'updatedAt:desc', limit: 1 });
  const statistic = result.results.length ? result.results[0] : {};
  return statistic;
};

/**
 * Delete statistics by filter
 * @param {object} filter
 * @returns {Promise<ActivityLog>}
 */
const deleteStatisticsByFilter = async (filter) => {
  const response = await Statistic.deleteMany(filter);
  return response;
};

module.exports = {
  createStatistic,
  queryStatistics,
  getStatisticById,
  updateStatisticById,
  deleteStatisticById,
  getLatestStatistic,
  deleteStatisticsByFilter,
};
