const {
    createProject,
    getProjectById,
    getProjectByQuery,
    updateProject,
    deleteProject,
    getProjectByUserId,
    updateProjectUser,
} = require('../services/projectService');
const projectController = {
    createProject: async (req, res) => {
        const { userId } = req.decoded;
        const projectData = req.body;
        try {
            await createProject({ ...projectData, projectCode: Date.now(), owner: userId });
            res.status(200).json({ err: 0, msg: 'Add successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getProjectById: async (req, res) => {
        const { projectId } = req.params;
        try {
            const results = await getProjectById(projectId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getProjectByUserId: async (req, res) => {
        const { userId } = req.decoded;
        try {
            const results = await getProjectByUserId(userId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getProjectByQuery: async (req, res) => {
        const { code, name, startDate, endDate, dueDate, status, userId } = req.query;
        const query = {};
        // code name tìm gần đúng
        if (code) query.code = code;
        if (name) query.name = name;
        if (startDate) query.startDate = { $gte: new Date(startDate) };
        if (endDate) query.endDate = { $lte: new Date(endDate) };
        if (dueDate) query.dueDate = { $lte: new Date(endDate) };
        if (status) query.status = status;
        if (userId) query.userId = userId;
        try {
            const results = await getProjectByQuery(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },

    updateProject: async (req, res) => {
        const { projectId } = req.params;
        const projectData = req.body;
        try {
            await updateProject(projectId, projectData);
            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateProjectUser: async (req, res) => {
        const { projectId } = req.params;
        const { projectRole, projectUser } = req.body;

        try {
            await updateProjectUser(projectId, projectRole, projectUser);
            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteProject: async (req, res) => {
        const { projectId } = req.params;
        try {
            await deleteProject(projectId);
            res.status(200).json({ err: 0, msg: 'Delete successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = projectController;
