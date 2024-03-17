const momentjs = require('moment');
const projectMiddleware = {
    checkProjectId: async (req, res, next) => {
        const { projectId } = req.params;
        if (!projectId)
            return res.status(400).json({ err: -1000, msg: 'Missing project id parameter!' });
        next();
    },
    checkBodyParameter: async (req, res, next) => {
        const { code, name, startDate, endDate, description, status } = req.body;
        if (!code || code.includes(' '))
            return res.status(400).json({
                err: -1000,
                msg: 'Missing project code or incorrect project code!',
            });
        if (!name)
            return res.status(400).json({ err: -1000, msg: 'Missing project name parameter!' });
        if (!startDate || !momentjs(startDate, 'YYYY-MM-DD', true).isValid())
            return res
                .status(400)
                .json({ err: -1000, msg: 'Missing start date or incorrect start date parameter!' });
        if (!endDate || !momentjs(endDate, 'YYYY-MM-DD', true).isValid())
            return res
                .status(400)
                .json({ err: -1000, msg: 'Missing end date or incorrect end date parameter!' });
        if (!description)
            return res
                .status(400)
                .json({ err: -1000, msg: 'Missing project desciption parameter!' });
        if (!status)
            return res.status(400).json({ err: -1000, msg: 'Missing project status parameter!' });
        next();
    },
};
module.exports = projectMiddleware;
