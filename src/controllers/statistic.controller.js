const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { statisticService, gatewayService, deviceService } = require('../services');

const transformStatisticBody = async (statistic = {}) => {
  if (statistic.statisticData && statistic.statisticData.length === 3) {
    const runTimeStatistics = statistic.statisticData[2];
    const resultDevices = await deviceService.queryDevices({}, { limit: 100 });
    runTimeStatistics.list = runTimeStatistics.list.map((deviceStatistic) => {
      let deviceStatus = '';
      if (deviceStatistic.dev_state === '65534') {
        deviceStatus = 'Offline';
      } else if (deviceStatistic.dev_state === '5120') {
        deviceStatus = 'Standby';
      } else if (deviceStatistic.dev_state === '0' && deviceStatistic.curr_power > 0) {
        deviceStatus = 'Run';
      } else {
        deviceStatus = 'Shutdown';
      }
      const selectedDevice = resultDevices.results.find((device) => device.deviceData.dev_name === deviceStatistic.dev_name);
      return {
        ...deviceStatistic,
        deviceStatus,
        dev_id: (selectedDevice && selectedDevice.deviceData && selectedDevice.deviceData.dev_id) || '',
      };
    });
  }
  return statistic;
};

const createStatistic = catchAsync(async (req, res) => {
  const { gatewayId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }

  const statisticBody = {
    ...body,
    gateway: gateway._id,
  };
  const transformedStatisticBody = await transformStatisticBody(statisticBody);
  const statistic = await statisticService.createStatistic(transformedStatisticBody);
  res.status(httpStatus.CREATED).send(statistic);
});

const getStatistics = catchAsync(async (req, res) => {
  const filter = {};
  const { gatewayId, from, to } = pick(req.query, ['gatewayId', 'from', 'to']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
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

  const result = await statisticService.queryStatistics(filter, options);
  res.send(result);
});

const getStatistic = catchAsync(async (req, res) => {
  const statistic = await statisticService.getStatisticById(req.params.statisticId);
  if (!statistic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statistic not found');
  }
  res.send(statistic);
});

const updateStatistic = catchAsync(async (req, res) => {
  const { gatewayId, ...body } = req.body;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const statistic = await statisticService.updateStatisticById(req.params.statisticId, body);
  res.send(statistic);
});

const deleteStatistic = catchAsync(async (req, res) => {
  await statisticService.deleteStatisticById(req.params.statisticId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getLatestStatistic = catchAsync(async (req, res) => {
  const filter = {};
  const { gatewayId } = pick(req.query, ['gatewayId']);
  if (gatewayId) {
    const gateway = await gatewayService.getGatewayByOption({ gatewayId });
    if (!gateway) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
    }
    filter.gateway = gateway._id;
  }

  const statistic = await statisticService.getLatestStatistic(filter);
  res.send(statistic);
});

const clearData = async (filter) => {
  // eslint-disable-next-line no-return-await
  return await statisticService.deleteStatisticsByFilter(filter);
};

module.exports = {
  createStatistic,
  getStatistics,
  getStatistic,
  updateStatistic,
  deleteStatistic,
  getLatestStatistic,
  clearData,
};
