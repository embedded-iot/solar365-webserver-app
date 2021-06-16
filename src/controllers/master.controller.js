const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const DateService = require('../utils/date.service');
const { masterService, deviceService, statisticService, faultService, activityLogService } = require('../services');
const config = require('../config/config');

const defaultSettings = {
  intervalRefresh: 12000,
  price: 2000,
};

const transformMaster = async (master) => {
  const devicesCount = await deviceService.getDevicesCount({ master: master.id });
  return {
    ...master,
    devicesCount,
    status: (master.settings && master.settings.status) || false,
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

const transformStatisticBodyWithFaultData = async (statistic = {}, faultData = []) => {
  if (statistic.statisticData && statistic.statisticData.length === 3) {
    const runTimeStatistics = statistic.statisticData[2];
    const resultDevices = await deviceService.queryDevices({}, { limit: 100 });
    runTimeStatistics.list = runTimeStatistics.list.map((deviceStatistic) => {
      const selectedDevice = resultDevices.results.find((device) => device.deviceData.dev_id === deviceStatistic.dev_id);
      const deviceId = (selectedDevice && selectedDevice.id) || null;
      const faultObj = faultData.find((fault) => fault.deviceId === deviceId);
      return {
        ...deviceStatistic,
        deviceId,
        faults: (faultObj && faultObj.faults) || [],
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
  yesterday.setMinutes(today.getMinutes() - config.latestUploadedDataMinutes);
  const latestFaultsResponse = await faultService.getLatestFaults({
    master: master._id,
    updatedAt: {
      $gt: yesterday,
      $lt: today,
    },
  });
  const faultList = latestFaultsResponse.results.map((item) => {
    // eslint-disable-next-line no-shadow
    const { master, device, faultData, ...fault } = item.toJSON();
    return {
      ...fault,
      deviceId: (device && device.id) || '',
    };
  });

  const faultData = [];
  const existingDeviceIDs = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < faultList.length; i++) {
    const fault = faultList[i];
    const existID = existingDeviceIDs.indexOf(fault.deviceId);
    if (existID === -1) {
      faultData.push({
        deviceId: fault.deviceId,
        faults: [fault],
      });
      existingDeviceIDs.push(fault.deviceId);
    } else {
      faultData[existID].faults.push(fault);
    }
  }

  const result = {
    from: yesterday,
    to: today,
    statisticData: (await transformStatisticBodyWithFaultData(latestStatisticResponse, faultData)).statisticData,
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
  yesterday.setMinutes(today.getMinutes() - config.latestUploadedDataMinutes);
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
      const { master, device, faultData, ...fault } = item.toJSON();
      return {
        ...fault,
      };
    }),
  };
  res.send(result);
});

const updateMasterStatus = catchAsync(async (req, res) => {
  const { masterKey } = req.params;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  master.settings = {
    ...(master.settings || defaultSettings),
    status: req.body.status,
    lastUpdatedStatusTime: new Date(),
  };
  master.save();
  res.send();
});

const autoUpdateMasterStatus = async () => {
  const result = await masterService.queryMasters({}, { limit: 100 });
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < result.results.length; i++) {
    const master = result.results[i];
    if (
      !master.settings ||
      !master.settings.lastUpdatedStatusTime ||
      DateService.getMinutesBetweenDates(new Date(master.settings.lastUpdatedStatusTime), new Date()) > 5 // 5 minutes
    ) {
      master.settings = {
        ...(master.settings || defaultSettings),
        status: false,
        lastUpdatedStatusTime: new Date(),
      };
      master.save();
      // eslint-disable-next-line no-await-in-loop
      await activityLogService.createActivityLog({
        category: 'Master',
        type: 'Error',
        description: 'Master offline',
        master: master._id,
      });
    }
  }
};

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
  updateMasterStatus,
  autoUpdateMasterStatus,
};
