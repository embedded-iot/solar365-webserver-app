const Joi = require('joi');
const { DEVICE_TYPE_VALUES, STATE_VALUES } = require('../config/constants');

const syncRealDevices = {
  params: Joi.object().keys({
    gatewayId: Joi.string().required(),
  }),
  body: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .required()
          .valid(DEVICE_TYPE_VALUES.LOGGER, DEVICE_TYPE_VALUES.INVERTER, DEVICE_TYPE_VALUES.SENSOR),
        deviceId: Joi.number().required(),
        name: Joi.string().allow(''),
        ipAddress: Joi.string().allow(''),
        port: Joi.number(),
        startDataAddress: Joi.number(),
        endDataAddress: Joi.number(),
        state: Joi.string().valid(STATE_VALUES.OFFLINE, STATE_VALUES.ONLINE),
        dataList: Joi.array().items({
          address: Joi.array().items(Joi.number()),
          dataType: Joi.string().allow(''),
          value: Joi.string().allow(''),
          unit: Joi.string().allow(''),
        }),
      })
    )
    .required(),
};

const getGatewaySettings = {
  params: Joi.object().keys({
    gatewayId: Joi.string().required(),
  }),
};

module.exports = {
  syncRealDevices,
  getGatewaySettings,
};
