const mongoose = require("mongoose");

const { MESSAGES } = require("../utils/messages/mongooseMessages");

const EmailCodeScheme = new mongoose.Schema({
    email:{
           type: String,
           required: [true, MESSAGES.email.required],
           minLength: [3, MESSAGES.email.length],
           maxLength: [50, MESSAGES.email.length],
           validate: {
               validator: (value) => emailRegex.test(value),
               message: MESSAGES.email.invalidFormat
           }
       },
    newEmail:{
         type: String,
           required: [true, MESSAGES.email.required],
           minLength: [3, MESSAGES.email.length],
           maxLength: [50, MESSAGES.email.length],
           validate: {
               validator: (value) => emailRegex.test(value),
               message: MESSAGES.email.invalidFormat
           }
    },
    code: {
        type: String,
        required: [true, MESSAGES.LoginCode.code.required],
    },
    expiresAt: Date,
}, { timestamps: true });

const EmailCode = mongoose.model("EmailCode", EmailCodeScheme);

module.exports = EmailCode;