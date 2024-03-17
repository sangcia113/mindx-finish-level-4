const momentjs = require('moment');
const userProjectMiddleware = {
    checkUserProjectId: async (req, res, next) => {
        const { userProjectId } = req.params;
        if (!userProjectId)
            return res.status(400).json({ err: -1000, msg: 'Missing user project id parameter!' });
        next();
    },
    checkUserId: async (req, res, next) => {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ err: -1000, msg: 'Missing user id parameter!' });
        next();
    },
    checkProjectId: async (req, res, next) => {
        const { projectId } = req.params;
        if (!projectId)
            return res.status(400).json({ err: -1000, msg: 'Missing project id parameter!' });
        next();
    },
    checkBodyParameter: async (req, res, next) => {
        const { userId, projectId, role, dateOfJoin } = req.body;
        if (!userId) return res.status(400).json({ err: -1001, msg: 'Missing user id parameter!' });
        if (!projectId)
            return res.status(400).json({ err: -1001, msg: 'Missing project id parameter!' });
        if (!role) return res.status(400).json({ err: -1001, msg: 'Missing role parameter!' });
        if (!dateOfJoin || !momentjs(dateOfJoin, 'YYYY-MM-DD', true).isValid())
            return res.status(400).json({
                err: -1001,
                msg: 'Missing date of join or incorrect date of join parameter!',
            });
        next();
    },
};
module.exports = userProjectMiddleware;
