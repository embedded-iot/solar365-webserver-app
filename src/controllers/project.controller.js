const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');
const { getSearchOptions } = require('../utils/search.service');

const createProject = catchAsync(async (req, res) => {
  const projectBody = {
    ...req.body,
    user: req.user._id,
  };
  const project = await projectService.createProject(projectBody);
  res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['keyword']);
  const searchOptions = getSearchOptions(filter.keyword, ['name', 'description']);
  const filterByUserReq = {
    ...searchOptions,
    user: req.user._id,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await projectService.queryProjects(filterByUserReq, options);
  res.send(result);
});

const getProject = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.projectId,
  };
  const project = await projectService.getProjectByOption(option);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

const updateProject = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.projectId,
    user: req.user._id,
  };
  const projectBody = {
    ...req.body,
    user: req.user._id,
  };
  const project = await projectService.updateProjectByOption(option, projectBody);
  res.send(project);
});

const deleteProject = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.projectId,
    user: req.user._id,
  };
  await projectService.deleteProjectByOption(option);
  res.status(httpStatus.NO_CONTENT).send();
});

const getProjectsManagement = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['keyword']);
  const searchOptions = getSearchOptions(filter.keyword, ['name', 'description']);
  const filterByUserReq = {
    ...searchOptions,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await projectService.queryProjects(filterByUserReq, options);
  res.send(result);
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectsManagement,
};
