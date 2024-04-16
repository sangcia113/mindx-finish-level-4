const Project = require('../models/projectModel');
const UserProject = require('../models/userProjectModel');
const { USER_ROLE } = require('../constants');

const projectService = {
    createProject: async projectData => await new Project(projectData).save(),

    getProjectById: async projectId =>
        await Project.findById(projectId).populate('owner', 'fullName'),

    getProjectByUserId: async userId => {
        const projectId = (await UserProject.find({ userId })).map(item => item.projectId);

        const projects = await Project.find({
            $or: [{ owner: userId }, { _id: { $in: projectId } }],
        }).populate('owner', 'fullName');

        return projects;
    },

    getProjectByQuery: async query => await Project.find(query),

    updateProject: async (projectId, projectData) =>
        await Project.findByIdAndUpdate(projectId, projectData),

    updateProjectUser: async (projectId, projectRole, projectUser) => {
        const role = USER_ROLE[projectRole];

        const users = projectUser.map(userId => ({ user: userId, role }));

        await Project.findByIdAndUpdate(projectId, { users });
    },

    deleteProject: async projectId => {
        await UserProject.findOneAndDelete({ projectId });
        await Project.findByIdAndDelete(projectId);
    },
};

module.exports = projectService;
