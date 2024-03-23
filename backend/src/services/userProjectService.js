const UserProject = require('../models/userProjectModel');
const userProjectService = {
    createUserProject: async userProjectData => await new UserProject(userProjectData).save(),
    getUserProjectById: async userProjectId => await UserProject.findById(userProjectId),
    getUserProjectByQuery: async query => await UserProject.find(query),
    updateUserProject: async (userProjectId, userProjectData) =>
        await UserProject.findByIdAndUpdate(userProjectId, userProjectData),
    deleteUserProject: async userProjectId => await UserProject.findByIdAndDelete(userProjectId),
};
module.exports = userProjectService;
