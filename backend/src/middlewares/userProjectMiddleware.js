const { body, validationResult } = require('express-validator');
const { getUserById } = require('../services/userService');
const { getProjectById } = require('../services/projectService');
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
    checkBodyParameter: [
        body('userId')
            .isMongoId()
            .withMessage('UserId không hợp lệ!')
            .notEmpty()
            .withMessage('UserId không được để trống!'),
        body('projectId')
            .isMongoId()
            .withMessage('ProjectId không hợp lệ!')
            .notEmpty()
            .withMessage('ProjectId không được để trống!'),
        body('role')
            .isIn(['Project Owner', 'Project Manager', 'Regular Member', 'Project Supervisor'])
            .withMessage('Role không hợp lệ!'),
        body('dateOfJoin')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày tham gia không hợp lệ!'),
        body().custom(async value => {
            const userId = await getUserById(userId);
            const projectId = await getProjectById(projectId);
            if (userId) throw new Error('UserId không hợp lệ!');
            if (projectId) throw new Error('ProjectId không hợp lệ!');
            return true;
        }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = userProjectMiddleware;
