const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { masterService, deviceService, statisticService, faultService } = require('../services');

const defaultSettings = {
  intervalRefresh: 12000,
  price: 2000,
};

const transformMaster = async (master) => {
  const devicesCount = await deviceService.getDevicesCount({ master: master.id });
  return {
    ...master,
    devicesCount,
  };
};

const createMaster = catchAsync(async (req, res) => {
  const masterBody = {
    ...req.body,
    user: req.user._id,
  };
  const master = await masterService.createMaster(masterBody);
  res.status(httpStatus.CREATED).send(master);
});

const getMasters = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const filterByUserReq = {
    ...filter,
    user: req.user._id,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await masterService.queryMasters(filterByUserReq, options);
  const results = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < result.results.length; index++) {
    const master = result.results[index];
    // eslint-disable-next-line no-await-in-loop
    const transformedMaster = await transformMaster(master.toJSON());
    results.push(transformedMaster);
  }
  result.results = results;
  res.send(result);
});

const getMaster = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.masterId,
    user: req.user._id,
  };
  const master = await masterService.getMasterByOption(option);
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const transformedMaster = await transformMaster(master.toJSON());
  res.send(transformedMaster);
});

const updateMaster = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.masterId,
    user: req.user._id,
  };
  const masterBody = {
    ...req.body,
    user: req.user._id,
  };
  const master = await masterService.updateMasterByOption(option, masterBody);
  res.send(master);
});

const deleteMaster = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.masterId,
    user: req.user._id,
  };
  await masterService.deleteMasterByOption(option);
  res.status(httpStatus.NO_CONTENT).send();
});

const getMasterSettings = catchAsync(async (req, res) => {
  const { masterKey } = req.params;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const settings = {
    ...defaultSettings,
    ...master.settings,
  };
  res.send(settings);
});

const updateMasterSettings = catchAsync(async (req, res) => {
  const { masterKey } = req.params;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  master.settings = {
    ...defaultSettings,
    ...req.body.settings,
  };
  master.save();
  res.send();
});

const transformStatisticBody = async (statistic = {}) => {
  if (statistic.statisticData && statistic.statisticData.length === 3) {
    const runTimeStatistics = statistic.statisticData[2];
    const resultDevices = await deviceService.queryDevices({}, { limit: 100 });
    runTimeStatistics.list = runTimeStatistics.list.map((deviceStatistic) => {
      const selectedDevice = resultDevices.results.find((device) => device.deviceData.dev_id === deviceStatistic.dev_id);
      return {
        ...deviceStatistic,
        deviceId: (selectedDevice && selectedDevice.id) || null,
      };
    });
  }
  return statistic;
};

const getMasterStatus = catchAsync(async (req, res) => {
  const { masterKey } = req.params;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }

  const latestStatisticResponse = await statisticService.getLatestStatistic({ master: master._id });
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 10);
  const latestFaultsResponse = await faultService.getLatestFaults({
    master: master._id,
    updatedAt: {
      $gt: yesterday,
      $lt: today,
    },
  });
  const result = {
    statisticData: (await transformStatisticBody(latestStatisticResponse)).statisticData,
    faultData: latestFaultsResponse.results,
  };
  res.send(result);
});

const getDevicesStatus = catchAsync(async (req, res) => {
  const { masterKey, deviceId } = req.params;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const device = await deviceService.getDeviceByOption({
    _id: deviceId,
    master: master._id,
  });
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 10);
  const latestFaultsResponse = await faultService.getLatestFaults({
    device: device._id,
    updatedAt: {
      $gt: yesterday,
      $lt: today,
    },
  });
  const result = {
    from: yesterday,
    to: today,
    faultData: latestFaultsResponse.results.map((item) => {
      // eslint-disable-next-line no-shadow
      const { master, device, ...fault } = item.toJSON();
      return {
        ...fault,
      };
    }),
  };
  res.send(result);
});

module.exports = {
  createMaster,
  getMasters,
  getMaster,
  updateMaster,
  deleteMaster,
  getMasterSettings,
  updateMasterSettings,
  getMasterStatus,
  getDevicesStatus,
};
