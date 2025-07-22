const mongoose = require('mongoose');
const { MESSAGES } = require('../utils/messages/mongooseMessages');

const businessSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, MESSAGES.Business.owner.required],
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
        maxLength: [500,MESSAGES.Business.bio.length]
    },
    employeeCount: {
        type: Number,
        default: 1,
        min: [1,MESSAGES.Business.employeeCount.length]
    },
},{timestamps:true});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business