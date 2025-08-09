const mongoose = require("mongoose");

const { MESSAGES } = require("../utils/messages/mongooseMessages");

const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, MESSAGES.Message.user.required],
    },
    context: {
        type: String,
        required: [true, MESSAGES.Message.context.required],
        minLength: [5, MESSAGES.Message.context.length],
        maxLength: [250, MESSAGES.Message.context.length],
    },
    read: {
        type: Boolean,
        default: false,
        required: [true, MESSAGES.Message.read.required]
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        default:null
    }

}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;