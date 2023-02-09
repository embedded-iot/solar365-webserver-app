const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const DateService = require('../utils/date.service');
const { gatewayService, deviceService, statisticService, faultService, activityLogService } = require('../services');
const config = require('../config/config');

const defaultSettings = {
  intervalRefresh: 12000,
  price: 2000,
};

const transformGateway = async (gateway) => {
  const devicesCount = deviceService.getDevicesCount({ gateway: gateway.id });
  return {
    ...gateway,
    devicesCount,
    status: (gateway.settings && gateway.settings.status) || false,
  };
};

const createGateway = catchAsync(async (req, res) => {
  const gatewayBody = {
    ...req.body,
    user: req.user._id,
  };
  const gateway = await gatewayService.createGateway(gatewayBody);
  res.status(httpStatus.CREATED).send(gateway);
});

const getGateways = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const filterByUserReq = {
    ...filter,
    user: req.user._id,
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
    user: req.user._id,
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
    user: req.user._id,
  };
  const gatewayBody = {
    ...req.body,
    user: req.user._id,
  };
  const gateway = await gatewayService.updateGatewayByOption(option, gatewayBody);
  res.send(gateway);
});

const deleteGateway = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.gatewayId,
    user: req.user._id,
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

const getGatewayStatus = catchAsync(async (req, res) => {
  const { gatewayId } = req.params;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }

  const latestStatisticResponse = await statisticService.getLatestStatistic({ gateway: gateway._id });
  const today = new Date();
  const yesterday = new Date();
  yesterday.setMinutes(today.getMinutes() - config.latestUploadedDataMinutes);
  const latestFaultsResponse = await faultService.getLatestFaults({
    gateway: gateway._id,
    updatedAt: {
      $gt: yesterday,
      $lt: today,
    },
  });
  const faultList = latestFaultsResponse.results.map((item) => {
    // eslint-disable-next-line no-shadow
    const { gateway, device, faultData, ...fault } = item.toJSON();
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
  const { gatewayId, deviceId } = req.params;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  const device = await deviceService.getDeviceByOption({
    _id: deviceId,
    gateway: gateway._id,
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
      const { gateway, device, faultData, ...fault } = item.toJSON();
      return {
        ...fault,
      };
    }),
  };
  res.send(result);
});

const updateGatewayStatus = catchAsync(async (req, res) => {
  const { gatewayId } = req.params;
  const gateway = await gatewayService.getGatewayByOption({ gatewayId });
  if (!gateway) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
  }
  gateway.settings = {
    ...(gateway.settings || defaultSettings),
    status: req.body.status,
    lastUpdatedStatusTime: new Date(),
  };
  gateway.save();
  res.send();
});

const autoUpdateGatewayStatus = async () => {
  const result = await gatewayService.queryGateways({}, { limit: 100 });
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < result.results.length; i++) {
    const gateway = result.results[i];
    if (
      !gateway.settings ||
      !gateway.settings.lastUpdatedStatusTime ||
      DateService.getMinutesBetweenDates(new Date(gateway.settings.lastUpdatedStatusTime), new Date()) > 5 // 5 minutes
    ) {
      gateway.settings = {
        ...(gateway.settings || defaultSettings),
        status: false,
        lastUpdatedStatusTime: new Date(),
      };
      gateway.save();
      // eslint-disable-next-line no-await-in-loop
      await activityLogService.createActivityLog({
        category: 'Gateway',
        type: 'Error',
        description: 'Thiết bị đang ngoại tuyến',
        gateway: gateway._id,
      });
    }
  }
};

module.exports = {
  createGateway,
  getGateways,
  getGateway,
  updateGateway,
  deleteGateway,
  getGatewaySettings,
  updateGatewaySettings,
  getGatewayStatus,
  getDevicesStatus,
  updateGatewayStatus,
  autoUpdateGatewayStatus,
};
