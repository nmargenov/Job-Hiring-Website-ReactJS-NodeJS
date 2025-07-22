const mongoose = require('mongoose');
const { MESSAGES } = require('../utils/messages/mongooseMessages');

const businessSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, MESSAGES.business.owner.required],
        unique: true
    },
    businessName: {
        type: String,
        default: '',
        required: [true, MESSAGES.business.businessName.required],
        validate: {
            validator: function (val) {

                return val.length >= 5 && val.length <= 50;
            },
            message: MESSAGES.business.businessName.length
        },
    },
    bio: {
        type: String,
        maxLength: [500,MESSAGES.business.bio.length]
    },
    employeeCount: {
        type: Number,
        min: [1,MESSAGES.business.employeeCount.length]
    }
});

const business = mongoose.model("Business", businessSchema);

module.exports = business