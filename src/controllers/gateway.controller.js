const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { gatewayService, deviceService, projectService, activityLogService } = require('../services');
const { STATE_VALUES, ACTIVITY_LOG_CATEGORY_VALUES, ACTIVITY_LOG_TYPE_VALUES } = require('../config/constants');
const { getSearchOptions } = require('../utils/search.service');

const checkExistingProject = async (projectId) => {
  const project = await projectService.getProjectByOption({ _id: projectId });
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
};

const transformGateway = async (gateway) => {
  const devicesCount = await deviceService.getDevicesCount({ gateway: gateway.id });
  return {
    ...gateway,
    devicesCount,
  };
};

const createGateway = catchAsync(async (req, res) => {
  const { projectId, ...body } = req.body;
  const gatewayBody = {
    ...body,
    project: projectId,
  };
  await checkExistingProject(projectId);
  const gateway = await gatewayService.createGateway(gatewayBody);
  res.status(httpStatus.CREATED).send(gateway);
});

const getGateways = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['keyword']);
  const searchOptions = getSearchOptions(filter.keyword, ['name', 'description']);
  const projects = await projectService.getProjectsByOption({ user: req.user._id });
  const projectIds = await projects.map((project) => project._id);
  const filterByUserReq = {
    ...searchOptions,
    project: { $in: projectIds },
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await gatewayService.queryGateways(filterByUserReq, options);
  const results = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < result.results.length; index++) {
    const gateway = result.results[index];
    // eslint-disable-next-line no-await-in-loop
    const transformedGateway = await transformGateway(gateway.toJSON());
    results.push(transformedGateway);
  }
  result.results = results;
  res.send(result);
});

const getGateway = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.gatewayId,
  };
  const gateway = await gatewayService.getGatewayByOption(option);
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const transformedGateway = await transformGateway(gateway.toJSON());
  res.send(transformedGateway);
});

const updateGateway = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.gatewayId,
  };
  const { projectId, ...body } = req.body;
  const gatewayBody = {
    ...body,
    project: projectId,
  };
  await checkExistingProject(projectId);
  const gateway = await gatewayService.updateGatewayByOption(option, gatewayBody);
  const transformedGateway = await transformGateway(gateway.toJSON());
  res.send(transformedGateway);
});

const deleteGateway = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.gatewayId,
  };
  await gatewayService.deleteGatewayByOption(option);
  res.status(httpStatus.NO_CONTENT).send();
});

const autoUpdateGatewayStatus = async (refreshStateAfterTime) => {
  const filters = {
    updatedAt: {
      $lte: new Date() - refreshStateAfterTime,
    },
  };
  const offlineGateways = await gatewayService.getGatewaysByOption(filters);
  if (offlineGateways.length) {
    await gatewayService.updateGatewaysByOption(filters, {
      state: STATE_VALUES.OFFLINE,
      updatedStateAt: new Date(),
    });
    await Promise.all(
      offlineGateways.map(async (gateway) => {
        const activityLogBody = {
          gateway: gateway._id,
          category: ACTIVITY_LOG_CATEGORY_VALUES.GATEWAY,
          type: ACTIVITY_LOG_TYPE_VALUES.WARNING,
          description: 'Gateway not found',
          details: gateway._id,
        };
        await activityLogService.createActivityLog(activityLogBody);
      })
    );
  }
  return offlineGateways;
};

const getGatewaysManagement = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['keyword']);
  const searchOptions = getSearchOptions(filter.keyword, ['name', 'description']);
  const projects = await projectService.getProjectsByOption({});
  const projectIds = await projects.map((project) => project._id);
  const filterByUserReq = {
    ...searchOptions,
    project: { $in: projectIds },
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await gatewayService.queryGateways(filterByUserReq, options);
  const results = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < result.results.length; index++) {
    const gateway = result.results[index];
    // eslint-disable-next-line no-await-in-loop
    const transformedGateway = await transformGateway(gateway.toJSON());
    results.push(transformedGateway);
  }
  result.results = results;
  res.send(result);
});

const updateGatewaySettingsManagement = catchAsync(async (req, res) => {
  const { gatewayId } = req.params;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  gateway.settings = {
    ...req.body,
  };
  gateway.save();
  res.send();
});

module.exports = {
  createGateway,
  getGateways,
  getGateway,
  updateGateway,
  deleteGateway,
  autoUpdateGatewayStatus,
  getGatewaysManagement,
  updateGatewaySettingsManagement,
};
