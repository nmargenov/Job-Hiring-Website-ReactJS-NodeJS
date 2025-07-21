const mongoose = require("mongoose");

const LoginCodeSchema = new mongoose.Schema({
    email: String,
    code: String,
    expiresAt: Date,
}, { timestamps: true });

const LoginCode = mongoose.model("LoginCode", LoginCodeSchema);

module.exports = LoginCode