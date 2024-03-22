const { body, validationResult } = require('express-validator');
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
            .withMessage('projectId không hợp lệ!')
            .notEmpty()
            .withMessage('projectId không được để trống!'),
        body('role')
            .isIn(['Project Owner', 'Project Manager', 'Regular Member', 'Project Supervisor'])
            .withMessage('Role không hợp lệ!'),
        body('dateOfJoin')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày tham gia không hợp lệ!'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = userProjectMiddleware;
