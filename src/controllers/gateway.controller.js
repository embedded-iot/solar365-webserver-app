const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const DateService = require('../utils/date.service');
const {
  gatewayService,
  deviceService,
  statisticService,
  faultService,
  activityLogService,
  projectService,
} = require('../services');
const config = require('../config/config');
const { STATE_VALUES } = require('../config/constants');

const defaultSettings = {
  refreshDataAfterTime: 12000,
  price: 2000,
};

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
  const filter = pick(req.query, ['name', 'projectId']);
  const filterByUserReq = {
    ...filter,
    projectId: req.query.projectId,
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

const getGatewaySettings = catchAsync(async (req, res) => {
  const { gatewayId } = req.params;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const settings = {
    ...defaultSettings,
    ...gateway.settings,
  };
  res.send(settings);
});

const updateGatewaySettings = catchAsync(async (req, res) => {
  const { gatewayId } = req.params;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  gateway.settings = {
    ...defaultSettings,
    ...req.body.settings,
  };
  gateway.save();
  res.send();
});

const autoUpdateGatewayStatus = async (refreshStateAfterTime) => {
  await gatewayService.updateGatewaysByOption(
    {
      updatedStateAt: {
        $lte: new Date() - refreshStateAfterTime,
      },
    },
    {
      state: STATE_VALUES.OFFLINE,
      updatedStateAt: new Date(),
    }
  );
};

module.exports = {
  createGateway,
  getGateways,
  getGateway,
  updateGateway,
  deleteGateway,
  getGatewaySettings,
  updateGatewaySettings,
  autoUpdateGatewayStatus,
};
