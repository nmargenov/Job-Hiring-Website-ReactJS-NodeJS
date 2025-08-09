const Message = require("../models/Message");

exports.getMessages = async (userID, page, limit) => {
    const messages = await Message.find({ user: userID })
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(parseInt(limit));

    const total = await Message.countDocuments({ user: userID });

    return {
        messages,
        hasMore: total > (parseInt(page) + 1) * parseInt(limit)
    }
}

exports.readMessages = async (userID) => {
    const messages = await Message.updateMany({ user: userID }, { $set: { read: true } });
    const updatedMessages = await Message.find({ user: userID }).sort({ createdAt: -1 });
    return updatedMessages
}