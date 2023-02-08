const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

const transformProject = async (project) => {
  return {
    ...project,
  };
};

const createProject = catchAsync(async (req, res) => {
  const projectBody = {
    ...req.body,
    user: req.user._id,
  };
  const project = await projectService.createProject(projectBody);
  res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const filterByUserReq = {
    ...filter,
    user: req.user._id,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await projectService.queryProjects(filterByUserReq, options);
  // eslint-disable-next-line no-return-await
  res.send(result.results.map(async (project) => await transformProject(project.toJSON())));
});

const getProject = catchAsync(async (req, res) => {
  const option = {
    _id: req.params.projectId,
    user: req.user._id,
  };
  const project = await projectService.getProjectByOption(option);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  const transformedProject = await transformProject(project.toJSON());
  res.send(transformedProject);
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

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
