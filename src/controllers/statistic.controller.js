const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { statisticService, masterService, deviceService } = require('../services');

const transformStatisticBody = async (statistic = {}) => {
  if (statistic.statisticData && statistic.statisticData.length === 3) {
    const runTimeStatistics = statistic.statisticData[2];
    const devices = await deviceService.queryDevices({}, { limit: 100 });
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
      const selectedDevice = devices.results.find((device) => device.deviceData.dev_sn === deviceStatistic.deviceStatistic);
      return {
        ...deviceStatistic,
        deviceStatus,
        dev_id: selectedDevice.dev_id,
      };
    });
  }
  return statistic;
};

const createStatistic = catchAsync(async (req, res) => {
  const { masterKey, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }

  const statisticBody = {
    ...body,
    master: master._id,
  };
  const transfromedStatisticBody = await transformStatisticBody(statisticBody);
  const statistic = await statisticService.createStatistic(transfromedStatisticBody);
  res.status(httpStatus.CREATED).send(statistic);
});

const transformStatistic = (statistic = {}) => {
  if (statistic.statisticData && statistic.statisticData.length === 3) {
    const runTimeStatistics = statistic.statisticData[2];
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
      return {
        ...deviceStatistic,
        deviceStatus,
      };
    });
  }
  return statistic;
};

const getStatistics = catchAsync(async (req, res) => {
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

  const result = await statisticService.queryStatistics(filter, options);
  result.results = result.results.map((statistic) => transformStatistic(statistic));
  res.send(result);
});

const getStatistic = catchAsync(async (req, res) => {
  const statistic = await statisticService.getStatisticById(req.params.statisticId);
  if (!statistic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statistic not found');
  }
  res.send(transformStatistic(statistic.toJSON()));
});

const updateStatistic = catchAsync(async (req, res) => {
  const { masterKey, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
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
  const { masterKey } = pick(req.query, ['masterKey']);
  if (masterKey) {
    const master = await masterService.getMasterByOption({ masterKey });
    if (!master) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    filter.master = master._id;
  }

  const result = await statisticService.queryStatistics(filter, { sortBy: 'updatedAt:desc', limit: 1 });
  const statistic = result.results.length ? result.results[0] : null;
  if (!statistic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statistic not found');
  }
  res.send(transformStatistic(statistic.toJSON()));
});

module.exports = {
  createStatistic,
  getStatistics,
  getStatistic,
  updateStatistic,
  deleteStatistic,
  getLatestStatistic,
};
