const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createConfig = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    value: Joi.string(),
    comment: Joi.string(),
  }),
};

const getConfigs = {
  query: Joi.object().keys({
    keyword: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getConfig = {
  params: Joi.object().keys({
    configId: Joi.string().custom(objectId),
  }),
};

const updateConfig = {
  params: Joi.object().keys({
    configId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      value: Joi.string(),
      comment: Joi.string(),
    })
    .min(1),
};

const deleteConfig = {
  params: Joi.object().keys({
    configId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createConfig,
  getConfigs,
  getConfig,
  updateConfig,
  deleteConfig,
};
