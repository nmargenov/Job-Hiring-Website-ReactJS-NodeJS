const mongoose = require("mongoose");

const { MESSAGES } = require("../utils/messages/mongooseMessages");

const jobSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: [true, MESSAGES.Job.owner.required],
    },
    title: {
        type: String,
        required: [true, MESSAGES.Job.title.required],
        minLength: [5,MESSAGES.Job.title.length],
        maxLength: [150,MESSAGES.Job.title.length],
    },
    description: {
        type: String,
        required: [true, MESSAGES.Job.description.required],
        minLength: [50,MESSAGES.Job.description.length],
        maxLength: [1500,MESSAGES.Job.description.length],
    },
    salary: {
        type: Number,
        min:[1, MESSAGES.Job.salary.minValue],
        default:null
    },
    location: {
        type: String,
        default:null,
    },
    experience:{
        type: Number,
        default:null
    },
    applies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isActive: {
        type: Boolean,
        default: true,
        required: [true, MESSAGES.Job.isActive.required]
    }

}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;