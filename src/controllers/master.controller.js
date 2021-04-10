const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { masterService, deviceService } = require('../services');

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

module.exports = {
  createMaster,
  getMasters,
  getMaster,
  updateMaster,
  deleteMaster,
};
