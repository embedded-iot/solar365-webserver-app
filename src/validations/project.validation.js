const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};

const getProjects = {
  query: Joi.object().keys({
    keyword: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    projectId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteProject = {
  params: Joi.object().keys({
    projectId: Joi.string().custom(objectId),
  }),
};

const getProjectsManagement = {
  query: Joi.object().keys({
    keyword: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectsManagement,
};
