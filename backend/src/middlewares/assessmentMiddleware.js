const assessmentMiddleware = {
    checkAssessmentId: async (req, res, next) => {
        const { assessmentId } = req.params;
        if (!assessmentId)
            return res.status(400).json({ err: -1000, msg: 'Missing assessment id parameter!' });
        next();
    },
    checkStageId: async (req, res, next) => {
        const { stageId } = req.params;
        if (!stageId)
            return res.status(400).json({ err: -1000, msg: 'Missing stage id parameter!' });
        next();
    },
    checkUserId: async (req, res, next) => {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ err: -1000, msg: 'Missing user id parameter!' });
        next();
    },
    checkBodyParameter: async (req, res, next) => {
        const { stageId, userId, content } = req.body;
        if (!stageId)
            return res.status(400).json({ err: -1001, msg: 'Missing stage id parameter!' });
        if (!userId) return res.status(400).json({ err: -1001, msg: 'Missing user id parameter!' });
        if (!content)
            return res.status(400).json({ err: -1001, msg: 'Missing content parameter!' });
        next();
    },
};
module.exports = assessmentMiddleware;
