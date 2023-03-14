const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createActivityLog = {
  body: Joi.object().keys({
    gatewayId: Joi.string().required(),
    category: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
    details: Joi.string(),
  }),
};

const getActivityLogs = {
  query: Joi.object().keys({
    gatewayId: Joi.string(),
    from: Joi.number(),
    to: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getActivityLog = {
  params: Joi.object().keys({
    activityLogId: Joi.string().custom(objectId),
  }),
};

const updateActivityLog = {
  params: Joi.object().keys({
    activityLogId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      gatewayId: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
      description: Joi.string().required(),
      details: Joi.string(),
    })
    .min(1),
};

const deleteActivityLog = {
  params: Joi.object().keys({
    activityLogId: Joi.string().custom(objectId),
  }),
};

const getActivityLogsManagement = {
  query: Joi.object().keys({
    gatewayId: Joi.string(),
    from: Joi.number(),
    to: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createActivityLog,
  getActivityLogs,
  getActivityLog,
  updateActivityLog,
  deleteActivityLog,
  getActivityLogsManagement,
};
