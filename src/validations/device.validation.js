const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDevice = {
  body: Joi.object().keys({
    masterKey: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    deviceData: Joi.object().required(),
  }),
};

const getDevices = {
  query: Joi.object().keys({
    masterKey: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    deviceData: Joi.object(),
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
      masterKey: Joi.string(),
      name: Joi.string().required(),
      description: Joi.string(),
      deviceData: Joi.object().required(),
    })
    .min(1),
};

const deleteDevice = {
  params: Joi.object().keys({
    deviceId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice,
};
