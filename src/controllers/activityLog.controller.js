const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { activityLogService, gatewayService } = require('../services');

const transformActivityLog = (activityLog) => {
  const { gateway, ...log } = activityLog;
  return {
    ...log,
  };
};

const createActivityLog = catchAsync(async (req, res) => {
  const { gatewayId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }

  const activityLogBody = {
    ...body,
    gateway: gateway._id,
  };
  const activityLog = await activityLogService.createActivityLog(activityLogBody);
  res.status(httpStatus.CREATED).send(activityLog);
});

const getActivityLogs = catchAsync(async (req, res) => {
  const filter = {};
  const { gatewayId, from, to } = pick(req.query, ['gatewayId', 'from', 'to']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.sortBy = options.sortBy || 'updatedAt:desc';
  if (gatewayId) {
    const gateway = await gatewayService.getGatewayByOption({ gatewayId });
    if (!gateway) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
    }
    filter.gateway = gateway._id;
  }

  if (from) {
    filter.updatedAt = {
      $gt: new Date(from),
      $lt: new Date(to || new Date()),
    };
  }

  const result = await activityLogService.queryActivityLogs(filter, options);
  result.results = result.results.map((activityLog) => transformActivityLog(activityLog.toJSON()));
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
  const { gatewayId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
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
  const { gatewayId } = pick(req.query, ['gatewayId']);
  if (gatewayId) {
    const gateway = await gatewayService.getGatewayByOption({ gatewayId });
    if (!gateway) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
    }
    filter.gateway = gateway._id;
  }

  const result = await activityLogService.queryActivityLogs(filter, { sortBy: 'updatedAt:desc', limit: 1 });
  const activityLog = result.results.length ? result.results[0] : null;
  if (!activityLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ActivityLog not found');
  }
  res.send(activityLog);
});

const clearData = async (filter) => {
  // eslint-disable-next-line no-return-await
  return await activityLogService.deleteActivityLogByFilter(filter);
};

module.exports = {
  createActivityLog,
  getActivityLogs,
  getActivityLog,
  updateActivityLog,
  deleteActivityLog,
  getLatestActivityLog,
  clearData,
};
