const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { configService } = require('../services');
const { getSearchOptions } = require('../utils/search.service');

const createConfig = catchAsync(async (req, res) => {
  const config = await configService.createConfig(req.body);
  res.status(httpStatus.CREATED).send(config);
});

const getConfigs = catchAsync(async (req, res) => {
  const { keyword } = pick(req.query, ['keyword']);
  const searchOptions = getSearchOptions(keyword, ['name', 'value', 'comment']);
  const filter = {
    ...searchOptions,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await configService.queryConfigs(filter, options);
  res.send(result);
});

const getConfig = catchAsync(async (req, res) => {
  const config = await configService.getConfigById(req.params.configId);
  if (!config) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Config not found');
  }
  res.send(config);
});

const updateConfig = catchAsync(async (req, res) => {
  const config = await configService.updateConfigById(req.params.configId, req.body);
  res.send(config);
});

const deleteConfig = catchAsync(async (req, res) => {
  await configService.deleteConfigById(req.params.configId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getPublicConfigs = catchAsync(async (req, res) => {
  const result = await configService.getConfigsByOption({});
  res.send({
    results: result,
    totalResults: result.length,
  });
});

const getConfigByName = catchAsync(async (name) => {
  // eslint-disable-next-line no-return-await
  return await configService.getConfigsByOption({ name });
});

module.exports = {
  createConfig,
  getConfigs,
  getConfig,
  updateConfig,
  deleteConfig,
  getPublicConfigs,
  getConfigByName,
};
