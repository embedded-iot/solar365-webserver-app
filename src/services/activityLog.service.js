const httpStatus = require('http-status');
const { ActivityLog } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a activityLog
 * @param {Object} activityLogBody
 * @returns {Promise<ActivityLog>}
 */
const createActivityLog = async (activityLogBody) => {
  // if (await ActivityLog.isActivityLogNameTaken(activityLogBody.name)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'ActivityLog name already taken');
  // }
  const activityLog = await ActivityLog.create(activityLogBody);
  return activityLog;
};

/**
 * Query for activityLogs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryActivityLogs = async (filter, options) => {
  const activityLogs = await ActivityLog.paginate(filter, { ...options, populate: 'gateway' });
  return activityLogs;
};

/**
 * Get activityLog by id
 * @param {ObjectId} id
 * @returns {Promise<ActivityLog>}
 */
const getActivityLogById = async (id) => {
  return ActivityLog.findById(id).populate('gateway').exec();
};

/**
 * Update activityLog by id
 * @param {ObjectId} activityLogId
 * @param {Object} updateBody
 * @returns {Promise<ActivityLog>}
 */
const updateActivityLogById = async (activityLogId, updateBody) => {
  const activityLog = await getActivityLogById(activityLogId);
  if (!activityLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ActivityLog not found');
  }
  Object.assign(activityLog, updateBody);
  await activityLog.save();
  return activityLog;
};

/**
 * Delete activityLog by id
 * @param {ObjectId} activityLogId
 * @returns {Promise<ActivityLog>}
 */
const deleteActivityLogById = async (activityLogId) => {
  const activityLog = await getActivityLogById(activityLogId);
  if (!activityLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ActivityLog not found');
  }
  await activityLog.remove();
  return activityLog;
};

/**
 * Delete activityLog by filter
 * @param {object} filter
 * @returns {}
 */
const deleteActivityLogByFilter = async (filter) => {
  const response = await ActivityLog.deleteMany(filter);
  return response;
};

module.exports = {
  createActivityLog,
  queryActivityLogs,
  getActivityLogById,
  updateActivityLogById,
  deleteActivityLogById,
  deleteActivityLogByFilter,
};
