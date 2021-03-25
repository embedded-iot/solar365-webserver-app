const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { activityLogService, masterService } = require('../services');

const createActivityLog = catchAsync(async (req, res) => {
  const { masterKey, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }

  const activityLogBody = {
    ...body,
    master: master._id,
  };
  const activityLog = await activityLogService.createActivityLog(activityLogBody);
  res.status(httpStatus.CREATED).send(activityLog);
});

const getActivityLogs = catchAsync(async (req, res) => {
  const filter = {};
  const { masterKey, from, to } = pick(req.query, ['masterKey', 'from', 'to']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (masterKey) {
    const master = await masterService.getMasterByOption({ masterKey });
    if (!master) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    filter.master = master._id;
  }

  if (from) {
    filter.updatedAt = {
      $gt: new Date(from),
      $lt: new Date(to || new Date()),
    };
  }

  const result = await activityLogService.queryActivityLogs(filter, options);
  res.send(result);
});

const getActivityLog = catchAsync(async (req, res) => {
  const activityLog = await activityLogService.getActivityLogById(req.params.activityLogId);
  if (!activityLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ActivityLog not found');
  }
  res.send(activityLog);
});

const updateActivityLog = catchAsync(async (req, res) => {
  const { masterKey, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const activityLog = await activityLogService.updateActivityLogById(req.params.activityLogId, body);
  res.send(activityLog);
});

const deleteActivityLog = catchAsync(async (req, res) => {
  await activityLogService.deleteActivityLogById(req.params.activityLogId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getLatestActivityLog = catchAsync(async (req, res) => {
  const filter = {};
  const { masterKey } = pick(req.query, ['masterKey']);
  if (masterKey) {
    const master = await masterService.getMasterByOption({ masterKey });
    if (!master) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    filter.master = master._id;
  }

  const result = await activityLogService.queryActivityLogs(filter, { sortBy: 'updatedAt:desc', limit: 1 });
  const activityLog = result.results.length ? result.results[0] : null;
  if (!activityLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ActivityLog not found');
  }
  res.send(activityLog);
});

module.exports = {
  createActivityLog,
  getActivityLogs,
  getActivityLog,
  updateActivityLog,
  deleteActivityLog,
  getLatestActivityLog,
};
