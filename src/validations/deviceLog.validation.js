const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDeviceLog = {
  body: Joi.object().keys({
    gatewayId: Joi.string().required(),
    deviceId: Joi.string().required(),
    deviceLogData: Joi.array(),
    deviceLogIOData: Joi.array(),
  }),
};

const getDeviceLogs = {
  query: Joi.object().keys({
    gatewayId: Joi.string(),
    deviceId: Joi.string(),
    from: Joi.number(),
    to: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDeviceLog = {
  params: Joi.object().keys({
    deviceLogId: Joi.string().custom(objectId),
  }),
};

const updateDeviceLog = {
  params: Joi.object().keys({
    deviceLogId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      deviceId: Joi.string().required(),
      gatewayId: Joi.string().required(),
      deviceLogData: Joi.array(),
      deviceLogIOData: Joi.array(),
    })
    .min(1),
};

const deleteDeviceLog = {
  params: Joi.object().keys({
    deviceLogId: Joi.string().custom(objectId),
  }),
};

const getLatestDeviceLog = {
  query: Joi.object().keys({
    gatewayId: Joi.string().required(),
    deviceId: Joi.string().required(),
  }),
};

const getStatisticDeviceLogs = {
  query: Joi.object().keys({
    gatewayId: Joi.string().required(),
    deviceId: Joi.string().required(),
    from: Joi.number().required(),
    to: Joi.number(),
    dataName: Joi.string().required(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createDeviceLog,
  getDeviceLogs,
  getDeviceLog,
  updateDeviceLog,
  deleteDeviceLog,
  getLatestDeviceLog,
  getStatisticDeviceLogs,
};
