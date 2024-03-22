const { body } = require('express-validator');
const momentjs = require('moment');
const stageMiddleware = {
    checkStageId: async (req, res, next) => {
        const { stageId } = req.params;
        if (!stageId)
            return res.status(400).json({ err: -1000, msg: 'Missing stage id parameter!' });
        next();
    },
    checkProjectId: async (req, res, next) => {
        const { projectId } = req.params;
        if (!projectId)
            return res.status(400).json({ err: -1000, msg: 'Missing project id parameter!' });
        next();
    },
    // checkBodyParameter: async (req, res, next) => {
    //     const { projectId, name, startDate, endDate } = req.body;
    //     if (!projectId)
    //         return res.status(400).json({ err: -1001, msg: 'Missing project id parameter!' });
    //     if (!name) return res.status(400).json({ err: -1001, msg: 'Missing name parameter!' });
    //     if (!startDate || !momentjs(startDate, 'YYYY-MM-DD', true).isValid())
    //         return res
    //             .status(400)
    //             .json({ err: -1001, msg: 'Missing start date or incorrect start date parameter!' });
    //     if (!endDate || !momentjs(endDate, 'YYYY-MM-DD', true).isValid())
    //         return res
    //             .status(400)
    //             .json({ err: -1001, msg: 'Missing end date or incorrect end date parameter!' });
    //     next();
    // },
    checkBodyParameter: [
        body('projectId')
            .isMongoId()
            .withMessage('projectId không hợp lệ!')
            .notEmpty()
            .withMessage('projectId không được để trống!'),
    ],
};
module.exports = stageMiddleware;
