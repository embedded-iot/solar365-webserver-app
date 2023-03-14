const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { activityLogService, gatewayService, projectService } = require('../services');

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
  const { gatewayId } = pick(req.query, ['gatewayId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.sortBy = options.sortBy || 'updatedAt:desc';
  const projects = await projectService.getProjectsByOption({ user: req.user._id });
  const projectIds = await projects.map((project) => project._id);
  const gatewayOptions = { project: { $in: projectIds } };
  if (gatewayId) {
    gatewayOptions.gatewayId = gatewayId;
  }
  const gateways = await gatewayService.getGatewaysByOption(gatewayOptions);
  const gatewayIds = await gateways.map((gateway) => gateway._id);
  if (!gatewayIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const filter = {
    gateway: {
      $in: gatewayIds,
    },
  };
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
  const { gatewayId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const activityLogBody = {
    ...body,
    gateway: gateway._id,
  };
  const activityLog = await activityLogService.updateActivityLogById(req.params.activityLogId, activityLogBody);
  res.send(activityLog);
});

const deleteActivityLog = catchAsync(async (req, res) => {
  await activityLogService.deleteActivityLogById(req.params.activityLogId);
  res.status(httpStatus.NO_CONTENT).send();
});

const clearData = async (filter) => {
  // eslint-disable-next-line no-return-await
  return await activityLogService.deleteActivityLogByFilter(filter);
};

const getActivityLogsManagement = catchAsync(async (req, res) => {
  const { gatewayId } = pick(req.query, ['gatewayId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.sortBy = options.sortBy || 'updatedAt:desc';
  const projects = await projectService.getProjectsByOption({});
  const projectIds = await projects.map((project) => project._id);
  const gatewayOptions = { project: { $in: projectIds } };
  if (gatewayId) {
    gatewayOptions.gatewayId = gatewayId;
  }
  const gateways = await gatewayService.getGatewaysByOption(gatewayOptions);
  const gatewayIds = await gateways.map((gateway) => gateway._id);
  if (!gatewayIds.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const filter = {
    gateway: {
      $in: gatewayIds,
    },
  };
  const result = await activityLogService.queryActivityLogs(filter, options);
  res.send(result);
});

module.exports = {
  createActivityLog,
  getActivityLogs,
  getActivityLog,
  updateActivityLog,
  deleteActivityLog,
  getActivityLogsManagement,
  clearData,
};
