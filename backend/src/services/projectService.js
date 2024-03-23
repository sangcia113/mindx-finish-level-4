const Project = require('../models/projectModel');
// repository
const projectService = {
    createProject: async projectData => await new Project(projectData).save(),
    getProjectById: async projectId => await Project.findById(projectId),
    getProjectByQuery: async query => await Project.find(query),
    updateProject: async (userId, projectId, projectData) =>
        await Project.findOneAndUpdate({ _id: projectId, userId }, projectData),
    deleteProject: async projectId => await Project.findByIdAndDelete(projectId),
};
module.exports = projectService;
