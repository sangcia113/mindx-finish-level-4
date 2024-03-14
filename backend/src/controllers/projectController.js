const {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../services/projectService');
const projectController = {
    createProject: async (req, res) => {
        try {
            const projectData = req.body;
            await createProject(projectData);
            res.status(201).json({ err: 0, msg: 'Insert project successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAllProject: async (req, res) => {
        try {
            const results = await getAllProject();
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getProjectById: async (req, res) => {
        try {
            const { projectId } = req.params;
            const results = await getProjectById(projectId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateProject: async (req, res) => {
        try {
            const { projectId } = req.params;
            const projectData = req.body;
            await updateProject(projectId, projectData);
            res.status(201).json({ err: 0, msg: 'Update project successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteProject: async (req, res) => {
        try {
            const { projectId } = req.params;
            await deleteProject(projectId);
            res.status(201).json({ err: 0, msg: 'Delete project successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = projectController;
