const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFault = {
  body: Joi.object().keys({
    gatewayId: Joi.string().required(),
    deviceId: Joi.number().required(),
    category: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string(),
    reason: Joi.string(),
    suggest: Joi.string(),
  }),
};

const getFaults = {
  query: Joi.object().keys({
    gatewayId: Joi.string(),
    deviceId: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFault = {
  params: Joi.object().keys({
    faultId: Joi.string().custom(objectId),
  }),
};

const updateFault = {
  params: Joi.object().keys({
    faultId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      gatewayId: Joi.string().required(),
      deviceId: Joi.number().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
      description: Joi.string(),
      reason: Joi.string(),
      suggest: Joi.string(),
    })
    .min(1),
};

const deleteFault = {
  params: Joi.object().keys({
    faultId: Joi.string().custom(objectId),
  }),
};

const getLatestFault = {
  query: Joi.object().keys({
    gatewayId: Joi.string().required(),
  }),
};

const getFaultsManagement = {
  query: Joi.object().keys({
    gatewayId: Joi.string(),
    deviceId: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createFault,
  getFaults,
  getFault,
  updateFault,
  deleteFault,
  getLatestFault,
  getFaultsManagement,
};
