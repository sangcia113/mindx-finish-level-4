const {
    createTask,
    getAllTask,
    getTaskById,
    getTaskByStageId,
    updateStask,
    deleteTask,
} = require('../services/taskService');
const taskController = {
    createTask: async (req, res) => {
        try {
            const taskData = req.body;
            await createTask(taskData);
            res.status(201).json({ err: 0, msg: 'Insert data successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAllTask: async (req, res) => {
        try {
            const results = await getAllTask();
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getTaskById: async (req, res) => {
        try {
            const { taskId } = req.params;
            const results = await getTaskById(taskId);
            reset.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getTaskByStageId: async (req, res) => {
        try {
            const { stageId } = req.params;
            const results = await getTaskByStageId(stageId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateTask: async (req, res) => {
        try {
            const { taskId } = req.params;
            const taskData = req.body;
            await updateStask(taskId, taskData);
            res.status(201).json({ err: 0, msg: 'Update task successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteTask: async (req, res) => {
        try {
            const { taskId } = req.params;
            await deleteTask(taskId);
            res.status(201).json({ err: 0, msg: 'Delete task successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = taskController;
