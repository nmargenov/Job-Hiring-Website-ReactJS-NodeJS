const Message = require("../models/Message");

exports.getMessages = async (userID, limit) => {
    let messages = []
    if (limit) {
        messages = await Message.find({ user: userID }).limit(limit);
    }else{
        messages = await Message.find({ user: userID });
    }
    
    return messages;
}