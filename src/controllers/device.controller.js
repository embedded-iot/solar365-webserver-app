const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deviceService, masterService } = require('../services');

const createDevice = catchAsync(async (req, res) => {
  const { masterKey, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const deviceBody = {
    ...body,
    deviceId: body.deviceData.dev_id,
    master: master._id,
  };
  const device = await deviceService.createDevice(deviceBody);
  res.status(httpStatus.CREATED).send(device);
});

const getDevices = catchAsync(async (req, res) => {
  const { masterKey, ...filter } = pick(req.query, ['masterKey', 'name']);
  if (masterKey) {
    const master = await masterService.getMasterByOption({ masterKey });
    if (!master) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    filter.master = master._id;
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await deviceService.queryDevices(filter, options);
  res.send(result);
});

const getDevice = catchAsync(async (req, res) => {
  const device = await deviceService.getDeviceById(req.params.deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  res.send(device);
});

const updateDevice = catchAsync(async (req, res) => {
  const { masterKey, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const deviceBody = {
    ...body,
    deviceId: body.deviceData.dev_id,
    master: master._id,
  };
  const device = await deviceService.updateDeviceById(req.params.deviceId, deviceBody);
  res.send(device);
});

const deleteDevice = catchAsync(async (req, res) => {
  await deviceService.deleteDeviceById(req.params.deviceId);
  res.status(httpStatus.NO_CONTENT).send();
});

const syncRealDevices = catchAsync(async (req, res) => {
  const { masterKey, list } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  const results = [];
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  /* eslint-disable no-plusplus */
  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < list.length; i++) {
    const deviceData = list[0];
    const existingDevice = await deviceService.getDeviceByOption({ master: master._id, deviceId: deviceData.dev_id });
    if (!existingDevice) {
      const deviceBody = {
        master: master._id,
        deviceId: deviceData.dev_id,
        name: `${deviceData.dev_name} ${deviceData.dev_id}`,
        deviceData,
      };
      const device = await deviceService.createDevice(deviceBody);
      results.push(device);
    } else {
      existingDevice.deviceData = deviceData;
      const device = await deviceService.updateDeviceById(existingDevice._id, existingDevice);
      results.push(device);
    }
  }
  /* eslint-enable no-plusplus */
  /* eslint-enable no-await-in-loop */
  res.status(httpStatus.CREATED).send({ results, totalResults: results.length });
});

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice,
  syncRealDevices,
};
