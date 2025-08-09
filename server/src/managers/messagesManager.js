const Message = require("../models/Message");
const { MESSAGES } = require("../utils/messages/Messages");

exports.getMessages = async (userID, page, limit) => {
    const messages = await Message.find({ user: userID })
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(parseInt(limit));

    const total = await Message.countDocuments({ user: userID });
    const totalUnread = await Message.countDocuments({ user: userID, read:false });

    return {
        messages,
        hasMore: total > (parseInt(page) + 1) * parseInt(limit),
        totalUnread
    }
}

exports.readMessage = async (userID, messageID) => {
    const message = await Message.findOneAndUpdate({ _id: messageID, user: userID }, { read: true }, { runValidators: true, new: true });
    if (!message) {
        throw new Error(MESSAGES.unauthorized);
    }

    return message;
}