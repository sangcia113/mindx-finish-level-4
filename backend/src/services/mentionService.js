const Mention = require('../models/mentionModel');
const mentionService = {
    createMention: async mentionData => await new Mention(mentionData).save(),
    getMentionById: async mentionId => await Mention.findById(mentionId),
    getMentionByQuery: async query => await Mention.find(query),
    updateMention: async (mentionId, mentionData) =>
        await Mention.findByIdAndUpdate(mentionId, mentionData),
    deleteMention: async mentionId => await Mention.findByIdAndDelete(mentionId),
};
module.exports = mentionService;
