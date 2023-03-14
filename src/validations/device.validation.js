const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { DEVICE_TYPE_VALUES, STATE_VALUES } = require('../config/constants');

const createDevice = {
  body: Joi.object().keys({
    type: Joi.string().required().valid(DEVICE_TYPE_VALUES.LOGGER, DEVICE_TYPE_VALUES.INVERTER, DEVICE_TYPE_VALUES.SENSOR),
    deviceId: Joi.number().required(),
    name: Joi.string(),
    ipAddress: Joi.string(),
    port: Joi.number(),
    startDataAddress: Joi.number(),
    endDataAddress: Joi.number(),
    state: Joi.string().valid(STATE_VALUES.OFFLINE, STATE_VALUES.ONLINE),
    gatewayId: Joi.string().required(),
  }),
};

const getDevices = {
  query: Joi.object().keys({
    gatewayId: Joi.string(),
    keyword: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDevice = {
  params: Joi.object().keys({
    deviceId: Joi.string().custom(objectId),
  }),
};

const updateDevice = {
  params: Joi.object().keys({
    deviceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      type: Joi.string().required().valid(DEVICE_TYPE_VALUES.LOGGER, DEVICE_TYPE_VALUES.INVERTER, DEVICE_TYPE_VALUES.SENSOR),
      deviceId: Joi.number().required(),
      name: Joi.string(),
      ipAddress: Joi.string(),
      port: Joi.number(),
      startDataAddress: Joi.number(),
      endDataAddress: Joi.number(),
      state: Joi.string().valid(STATE_VALUES.OFFLINE, STATE_VALUES.ONLINE),
      gatewayId: Joi.string().required(),
    })
    .min(1),
};

const deleteDevice = {
  params: Joi.object().keys({
    deviceId: Joi.string().custom(objectId),
  }),
};

const getDevicesManagement = {
  query: Joi.object().keys({
    gatewayId: Joi.string(),
    keyword: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice,
  getDevicesManagement,
};
