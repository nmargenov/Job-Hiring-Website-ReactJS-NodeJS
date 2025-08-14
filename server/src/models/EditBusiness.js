const mongoose = require('mongoose');
const { MESSAGES } = require('../utils/messages/mongooseMessages')

const editBusinessSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: [true, MESSAGES.EditBusiness.business.required],
        unique: true
    },
    businessName: {
        type: String,
        default: '',
        required: [true, MESSAGES.Business.businessName.required],
        validate: {
            validator: function (val) {

                return val.length >= 5 && val.length <= 50;
            },
            message: MESSAGES.Business.businessName.length
        },
    },
    bio: {
        type: String,
        default: "",
        maxLength: [500, MESSAGES.Business.bio.length]
    },
    employeeCount: {
        type: Number,
        default: 1,
        min: [1, MESSAGES.Business.employeeCount.length]
    },
}, { timestamps: true });

const EditBusiness = mongoose.model("EditBusiness", editBusinessSchema);

module.exports = EditBusiness