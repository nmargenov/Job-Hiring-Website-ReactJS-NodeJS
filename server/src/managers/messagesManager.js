const Message = require("../models/Message");

exports.getMessages = async (userID) => {
    const messages = await Message.find({ user: userID }).sort({ createdAt: -1 });
    return messages;
}

exports.readMessages = async (userID) => {
    const messages = await Message.updateMany({ user: userID }, { $set: { read: true } });
    const updatedMessages = await Message.find({ user: userID }).sort({createdAt: -1});
    return updatedMessages
}