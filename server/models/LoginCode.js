const mongoose = require("mongoose");

const LoginCodeSchema = new mongoose.Schema({
    email:{
           type: String,
           required: [true, 'Email is required'],
           minLength: [3, 'Email must be between 3 and 50 characters'],
           maxLength: [50, 'Email must be between 3 and 50 characters'],
           validate: {
               validator: (value) => emailRegex.test(value),
               message: "Invalid email format!",
           }
       },
    code: {
        type: String,
        required: [true, 'Code is required'],
    },
    expiresAt: Date,
}, { timestamps: true });

const LoginCode = mongoose.model("LoginCode", LoginCodeSchema);

module.exports = LoginCode