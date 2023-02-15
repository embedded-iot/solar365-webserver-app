const httpStatus = require('http-status');
const { Project } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 */
const createProject = async (projectBody) => {
  const project = await Project.create(projectBody);
  return project;
};

/**
 * Query for projects
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProjects = async (filter, options) => {
  const projects = await Project.paginate(filter, options);
  return projects;
};

/**
 * Get project by option
 * @param {Object} option
 * @returns {Promise<Project>}
 */
const getProjectByOption = async (option) => {
  return Project.findOne(option);
};

/**
 * Get projects by option
 * @param {Object} option
 * @returns {Promise<Project>}
 */
const getProjectsByOption = async (option) => {
  return Project.find(option);
};

/**
 * Update project by Option
 * @param {{_id: *, user: *}} option
 * @param {Object} updateBody
 * @returns {Promise<Project>}
 */
const updateProjectByOption = async (option, updateBody) => {
  const project = await getProjectByOption(option);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

/**
 * Delete project by id
 * @param {{_id: *, user: *}} option
 * @returns {Promise<Project>}
 */
const deleteProjectByOption = async (option) => {
  const project = await getProjectByOption(option);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  await project.remove();
  return project;
};

module.exports = {
  createProject,
  queryProjects,
  getProjectByOption,
  getProjectsByOption,
  updateProjectByOption,
  deleteProjectByOption,
};
