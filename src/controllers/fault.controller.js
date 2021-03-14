const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { faultService, masterService } = require('../services');

const createFault = catchAsync(async (req, res) => {
  const { masterKey, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }

  const faultBody = {
    ...body,
    master: master._id,
  };
  const fault = await faultService.createFault(faultBody);
  res.status(httpStatus.CREATED).send(fault);
});

const getFaults = catchAsync(async (req, res) => {
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

  const result = await faultService.queryFaults(filter, options);
  res.send(result);
});

const getFault = catchAsync(async (req, res) => {
  const fault = await faultService.getFaultById(req.params.faultId);
  if (!fault) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fault not found');
  }
  res.send(fault);
});

const updateFault = catchAsync(async (req, res) => {
  const { masterKey, ...body } = req.body;
  const master = await masterService.getMasterByOption({ masterKey });
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
  }
  const fault = await faultService.updateFaultById(req.params.faultId, body);
  res.send(fault);
});

const deleteFault = catchAsync(async (req, res) => {
  await faultService.deleteFaultById(req.params.faultId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFault,
  getFaults,
  getFault,
  updateFault,
  deleteFault,
};
