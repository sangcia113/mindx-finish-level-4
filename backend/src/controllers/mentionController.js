const {
    createMention,
    getMentionById,
    getMentionByQuery,
    updateMention,
    deleteMention,
} = require('../services/mentionService');

const mentionController = {
    createMention: async (req, res) => {
        const mentionData = req.body;
        try {
            await createMention(mentionData);
            res.status(200).json({ err: 0, msg: 'Add successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getMentionById: async (req, res) => {
        const { mentionId } = req.params;
        try {
            const results = await getMentionById(mentionId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getMentionByQuery: async (req, res) => {
        const { commentId, userId } = req.query;
        const query = {};
        if (commentId) query.commentId = commentId;
        if (userId) query.userId = userId;
        try {
            const results = await getMentionByQuery(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateMention: async (req, res) => {
        const { mentionId } = req.params;
        const mentionData = req.body;
        try {
            await updateMention(mentionId, mentionData);
            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteMention: async (req, res) => {
        const { mentionId } = req.params;
        try {
            await deleteMention(mentionId);
            res.status(200).json({ err: 0, msg: 'Delete successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = mentionController;
