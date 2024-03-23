const {
    createProject,
    getProjectById,
    getProjectByQuery,
    updateProject,
    deleteProject,
} = require('../services/projectService');
const projectController = {
    createProject: async (req, res) => {
        const { userId } = req.decoded;
        const projectData = req.body;
        try {
            await createProject({ ...projectData, userId });
            res.status(200).json({ err: 0, msg: 'Tạo project thành công!' });
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
        const { userId } = req.decoded;
        const { projectId } = req.params;
        const projectData = req.body;
        try {
            await updateProject(userId, projectId, projectData);
            res.status(200).json({ err: 0, msg: 'Cập nhật project thành công!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteProject: async (req, res) => {
        const { projectId } = req.params;
        try {
            await deleteProject(projectId);
            res.status(200).json({ err: 0, msg: 'Xoá project thành công!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = projectController;
