const momentjs = require('moment');
const taskMiddleware = {
    checkTaskId: async (req, res, next) => {
        const { taskId } = req.params;
        if (!taskId) return res.status(400).json({ err: -1000, msg: 'Missing task id parameter!' });
        next();
    },
    checkStageId: async (req, res, next) => {
        const { stageId } = req.params;
        if (stageId)
            return res.status(400).json({ err: -1000, msg: 'Missing stage id parameter!' });
        next();
    },
    checkBodyParameter: async (req, res, next) => {
        const {
            stageId,
            code,
            name,
            type,
            priority,
            startDate,
            deadline,
            description,
            status,
            createdBy,
            assignedTo,
        } = req.body;
        if (!stageId)
            return res.status(400).json({ err: -1001, msg: 'Missing stage id parameter!' });
        if (!code) return res.status(400).json({ err: -1001, msg: 'Missing code parameter!' });
        if (!name) return res.status(400).json({ err: -1001, msg: 'Missing name parameter!' });
        if (!type) return res.status(400).json({ err: -1001, msg: 'Missing type parameter!' });
        if (!priority)
            return res.status(400).json({ err: -1001, msg: 'Missing priority parameter!' });
        if (!startDate || !momentjs(startDate, 'YYYY-MM-DD', true).isValid())
            return res
                .status(400)
                .json({ err: -1001, msg: 'Missing start date or incorrect start date parameter!' });
        if (!deadline || !momentjs(deadline, 'YYYY-MM-DD', true).isValid())
            return res
                .status(400)
                .json({ err: -1001, msg: 'Missing deadline or incorrect deadline parameter!' });
        if (!description)
            return res.status(400).json({ err: -1001, msg: 'Missing description parameter!' });
        if (!status) return res.status(400).json({ err: -1001, msg: 'Missing status parameter!' });
        if (!createdBy)
            return res.status(400).json({ err: -1001, msg: 'Missing createdBy parameter!' });
        if (!assignedTo)
            return res.status(400).json({ err: -1001, msg: 'Missing assignedTo parameter!' });
        next();
    },
};
module.exports = taskMiddleware;
