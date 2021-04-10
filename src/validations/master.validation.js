const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMaster = {
  body: Joi.object().keys({
    masterKey: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};

const getMasters = {
  query: Joi.object().keys({
    masterKey: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMaster = {
  params: Joi.object().keys({
    masterId: Joi.string().custom(objectId),
  }),
};

const updateMaster = {
  params: Joi.object().keys({
    masterId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      masterKey: Joi.string(),
      name: Joi.string().required(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteMaster = {
  params: Joi.object().keys({
    masterId: Joi.string().custom(objectId),
  }),
};

const getMasterSettings = {
  params: Joi.object().keys({
    masterKey: Joi.string().required(),
  }),
};

const updateMasterSettings = {
  params: Joi.object().keys({
    masterKey: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      settings: Joi.object().required(),
    })
    .min(1),
};

module.exports = {
  createMaster,
  getMasters,
  getMaster,
  updateMaster,
  deleteMaster,
  getMasterSettings,
  updateMasterSettings,
};
