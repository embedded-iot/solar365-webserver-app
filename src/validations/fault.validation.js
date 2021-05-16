const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFault = {
  body: Joi.object().keys({
    masterKey: Joi.string().required(),
    deviceId: Joi.string().required(),
    category: Joi.string().required(),
    type: Joi.string().required(),
    event: Joi.string().required(),
    description: Joi.string(),
    faultData: Joi.object(),
  }),
};

const getFaults = {
  query: Joi.object().keys({
    masterKey: Joi.string(),
    from: Joi.number(),
    to: Joi.number(),
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
      masterKey: Joi.string().required(),
      deviceId: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
      event: Joi.string().required(),
      description: Joi.string(),
      faultData: Joi.object().required(),
    })
    .min(1),
};

const deleteFault = {
  params: Joi.object().keys({
    faultId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFault,
  getFaults,
  getFault,
  updateFault,
  deleteFault,
};
