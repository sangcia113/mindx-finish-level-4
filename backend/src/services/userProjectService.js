const UserProject = require('../models/userProjectModel');
const userProjectService = {
    createUserProject: async userProjectData => await new UserProject(userProjectData).save(),
    getAllUserProject: async () => await UserProject.find(),
    getUserProjectById: async userProjectId => await UserProject.findById(userProjectId),
    getUserProjectByUserId: async userId => await UserProject.findOne({ userId }),
    getUserProjectByProjectId: async projectId => await UserProject.findOne({ projectId }),
    updateUserProject: async (userProjectId, userProjectData) =>
        await UserProject.findByIdAndUpdate(userProjectId, userProjectData),
    deleteUserProject: async userProjectId => await UserProject.findByIdAndDelete(userProjectId),
};
module.exports = userProjectService;
