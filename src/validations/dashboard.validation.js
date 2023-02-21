const Joi = require('joi');

const getDashboardOverview = {
  query: Joi.object().keys({
    gatewayId: Joi.string().required(),
    keyword: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  getDashboardOverview,
};
