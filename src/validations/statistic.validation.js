const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createStatistic = {
  body: Joi.object().keys({
    masterKey: Joi.string().required(),
    statisticData: Joi.array().required(),
  }),
};

const getStatistics = {
  query: Joi.object().keys({
    masterKey: Joi.string(),
    from: Joi.string(),
    to: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStatistic = {
  params: Joi.object().keys({
    statisticId: Joi.string().custom(objectId),
  }),
};

const updateStatistic = {
  params: Joi.object().keys({
    statisticId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      masterKey: Joi.string().required(),
      statisticData: Joi.array().required(),
    })
    .min(1),
};

const deleteStatistic = {
  params: Joi.object().keys({
    statisticId: Joi.string().custom(objectId),
  }),
};

const getLatestStatistic = {
  query: Joi.object().keys({
    masterKey: Joi.string().required(),
  }),
};

module.exports = {
  createStatistic,
  getStatistics,
  getStatistic,
  updateStatistic,
  deleteStatistic,
  getLatestStatistic,
};
