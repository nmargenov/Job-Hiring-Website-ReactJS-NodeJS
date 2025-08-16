const mongoose = require('mongoose');
const { MESSAGES } = require('../utils/messages/mongooseMessages');
const { emailRegex } = require('../utils/regex');

const headAdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, MESSAGES.email.required],
        minLength: [3, MESSAGES.email.length],
        maxLength: [50, MESSAGES.email.length],
        validate: {
            validator: (value) => emailRegex.test(value),
            message: MESSAGES.email.invalidFormat,
        }
    },
}, { timestamps: true });

const HeadAdmin = mongoose.model("HeadAdmin", headAdminSchema);

module.exports = HeadAdmin