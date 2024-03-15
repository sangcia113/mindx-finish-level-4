const Project = require('../models/projectModel');
// repository
const projectService = {
    createProject: async projectData => await new Project(projectData).save(),
    getAllProject: async () => await new Project.find(),
    getProjectById: async projectId => await Project.findById(projectId),
    updateProject: async (projectId, projectData) =>
        await Project.findByIdAndUpdate(projectId, projectData),
    deleteProject: async projectId => await Project.findByIdAndDelete(projectId),
};
module.exports = projectService;
