const mongoose = require("mongoose");

const { emailRegex } = require("../utils/regex");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Email is required!'],
        minLength: [3, 'Email must be between 3 and 50 characters!'],
        maxLength: [50, 'Email must be between 3 and 50 characters!'],
        validate: {
            validator: (value) => emailRegex.test(value),
            message: "Invalid email format!",
        }
    },
    role: {
        type: String,
        enum: ["seeker","hirer","admin"],
        default: 'seeker'
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;