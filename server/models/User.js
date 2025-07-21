const mongoose = require("mongoose");

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;