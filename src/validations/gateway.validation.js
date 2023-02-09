const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createGateway = {
  body: Joi.object().keys({
    projectId: Joi.string().custom(objectId).required(),
    gatewayId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};

const getGateways = {
  query: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
    gatewayId: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getGateway = {
  params: Joi.object().keys({
    gatewayId: Joi.string().custom(objectId),
  }),
};

const updateGateway = {
  params: Joi.object().keys({
    gatewayId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      projectId: Joi.string().custom(objectId).required(),
      gatewayId: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteGateway = {
  params: Joi.object().keys({
    gatewayId: Joi.string().custom(objectId),
  }),
};

const getGatewaySettings = {
  params: Joi.object().keys({
    gatewayId: Joi.string().required(),
  }),
};

const updateGatewaySettings = {
  params: Joi.object().keys({
    gatewayId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      settings: Joi.object().required(),
    })
    .min(1),
};

const getGatewayStatus = {
  params: Joi.object().keys({
    gatewayId: Joi.string().required(),
  }),
};

const getDevicesStatus = {
  params: Joi.object().keys({
    gatewayId: Joi.string().required(),
    deviceId: Joi.string().required(),
  }),
};

const updateGatewayStatus = {
  params: Joi.object().keys({
    gatewayId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      status: Joi.boolean().required(),
    })
    .min(1),
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
};
