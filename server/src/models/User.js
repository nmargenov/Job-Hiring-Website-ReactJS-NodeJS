const mongoose = require("mongoose");

const { emailRegex, phoneRegex, countryCodeRegex } = require("../utils/regex");
const { MESSAGES } = require("../utils/messages/mongooseMessages");

const fileSchema = new mongoose.Schema({
    originalName: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    profilePicture: {
        default: null,
        type: String,
    },
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
    role: {
        type: String,
        required: [true, MESSAGES.userModel.role.required],
        enum: ["seeker", "hirer", "admin"],
        default: 'seeker'
    },
    countryCode: {
        type: String,
        default: '',
        validate: {
            validator: function (v) {
                return v === null || v === '' || countryCodeRegex.test(v);
            },
            message: MESSAGES.userModel.countryCode.validatorMessage
        }
    },
    phone: {
        type: String,
        default: '',
        required: [function () { if (this.isSetup) { return true; } }, MESSAGES.userModel.phone.required],
        validate: {
            validator: function (val) {
                return !this.isSetup || phoneRegex.test(val);
            },
            message: MESSAGES.userModel.phone.validatorMessage,
        }
    },
    firstName: {
        type: String,
        default: '',
        required: [function () { if (this.isSetup) { return true; } }, MESSAGES.userModel.firstName.required],
        validate: {
            validator: function (val) {
                if (!this.isSetup) return true;
                if (this.role === 'hirer') return true;
                return val.length >= 3 && val.length <= 30;
            },
            message: MESSAGES.userModel.firstName.length
        }
    },
    lastName: {
        type: String,
        default: '',
        required: [function () { if (this.isSetup) { return true; } }, MESSAGES.userModel.lastName.required],
        validate: {
            validator: function (val) {
                if (!this.isSetup) return true;
                if (this.role === 'hirer') return true;
                return val.length >= 5 && val.length <= 30;
            },
            message: MESSAGES.userModel.lastName.length
        }
    },
    isSetup: {
        type: Boolean,
        default: false,
        required: [true, MESSAGES.userModel.isSetup.required]
    },
    hasBusinessApplication: {
        type: Boolean,
        default: false,
        required: [true, MESSAGES.userModel.hasBusinessApplication.required]
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        default: null
    },
    isApproved: {
        type: Boolean,
        default: false,
        required: [true, MESSAGES.userModel.isApproved.required]
    },
    files: {
        type: [fileSchema],
        default: null
    }
}, { timestamps: true });



const User = mongoose.model("User", userSchema);

module.exports = User;