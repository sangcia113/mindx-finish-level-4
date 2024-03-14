const Mention = require('../models/mentionModel');
const mentionService = {
    createMention: async mentionData => await new Mention(mentionData).save(),
    getAllMention: async () => await Mention.find(),
    getMentionById: async mentionId => await Mention.findById(mentionId),
    getMentionByCommentId: async commentId => await Mention.findOne({ commentId }),
    getMentionByUserId: async userId => await Mention.findOne({ userId }),
    updateMention: async (mentionId, mentionData) =>
        await Mention.findByIdAndUpdate(mentionId, mentionData),
    deleteMention: async mentionId => await Mention.findByIdAndDelete(mentionId),
};
module.exports = mentionService;
