const {
    createMention,
    getAllMention,
    getMentionById,
    getMentionByCommentId,
    getMentionByUserId,
    updateMention,
    deleteMention,
} = require('../services/mentionService');

const mentionController = {
    createMention: async (req, res) => {
        try {
            const mentionData = req.body;
            await createMention(mentionData);
            res.status(201).json({ err: 0, msg: 'Insert mention successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAllMention: async (req, res) => {
        try {
            const results = await getAllMention();
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getMentionById: async (req, res) => {
        try {
            const { mentionId } = req.params;
            const results = await getMentionById(mentionId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getMentionByCommentId: async (req, res) => {
        try {
            const { commentId } = req.params;
            const results = await getMentionByCommentId(commentId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getMentionByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const results = await getMentionByUserId(userId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateMention: async (req, res) => {
        try {
            const { mentionId } = req.params;
            const mentionData = req.body;
            await updateMention(mentionId, mentionData);
            res.status(201).json({ err: 0, msg: 'Update mention successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteMention: async (req, res) => {
        try {
            const { mentionId } = req.params;
            await deleteMention(mentionId);
            res.status(201).json({ err: 0, msg: 'Delete mention successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = mentionController;
