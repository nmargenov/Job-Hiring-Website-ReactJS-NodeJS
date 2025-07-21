const mongoose = require("mongoose");

const { emailRegex, phoneRegex } = require("../utils/regex");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Email is required!'],
        minLength: [3, 'Email must be between 3 and 50 characters'],
        maxLength: [50, 'Email must be between 3 and 50 characters'],
        validate: {
            validator: (value) => emailRegex.test(value),
            message: "Invalid email format!",
        }
    },
    role: {
        type: String,
        required:[true, "Role is required"],
        enum: ["seeker","hirer","admin"],
        default: 'seeker'
    },
    phone: {
        type: String,
        default: '',
        required: [true, "Phone number is required"],
        validate: {
        validator: function (val) {
            return !this.isSetup || phoneRegex.test(val);
        },
        message: 'Phone must start with +<countrycode> or 0 and contain at least 6 digits'
    }
    },
    firstName: {
        type: String,
        default: '',
        required: [true, "First name is required"],
        validate: {
        validator: function (val) {
            return !this.isSetup || (val.length >= 5 && val.length <=30);
        },
        message: 'First name must be between 5 and 30 characters'
    }
    },
    lastName: {
        type: String,
        default: '',
        required: [true, "Last name is required"],
        validate: {
        validator: function (val) {
            return !this.isSetup || (val.length >= 5 && val.length <=30);
        },
        message: 'Last name must be between 5 and 30 characters'
    }   
    },
    isSetup: {
        type: Boolean,
        default: false,
        required: [true, "isSetup is required"]   
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;