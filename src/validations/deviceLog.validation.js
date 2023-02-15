const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDeviceLog = {
  body: Joi.object().keys({
    gatewayId: Joi.string().required(),
    deviceId: Joi.number().required(),
    list: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().allow(''),
          address: Joi.array().items(Joi.number()).min(0),
          dataType: Joi.string().allow(''),
          value: Joi.string().allow(''),
          unit: Joi.string().allow(''),
        })
      )
      .required(),
  }),
};

const getDeviceLogs = {
  query: Joi.object().keys({
    gatewayId: Joi.string(),
    deviceId: Joi.string(),
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
      gatewayId: Joi.string().required(),
      deviceId: Joi.number().required(),
      list: Joi.array()
        .items(
          Joi.object({
            name: Joi.string(),
            address: Joi.array().items(Joi.number()),
            dataType: Joi.string(),
            value: Joi.string(),
            unit: Joi.string(),
          })
        )
        .required(),
    })
    .min(1),
};

const deleteDeviceLog = {
  params: Joi.object().keys({
    deviceLogId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDeviceLog,
  getDeviceLogs,
  getDeviceLog,
  updateDeviceLog,
  deleteDeviceLog,
};
