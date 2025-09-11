const mongoose = require('mongoose');
const Business = require("../models/Business");
const Job = require("../models/Job");
const Message = require("../models/Message");

const { getIO } = require("../socket.js");
const { MESSAGES } = require("../utils/messages/Messages");
const User = require('../models/User.js');

exports.createJob = async (userID, title, description, salary, location, experience) => {
    const business = await Business.findOne({ owner: userID }).populate({ path: "owner" });

    if (!business || !business.owner.isApproved) throw new Error(MESSAGES.unauthorized);
    const job = await Job.create(
        {
            owner: business._id,
            title,
            description,
            salary,
            location,
            experience
        });

    const admins = await User.find({ role: 'admin' }).select('_id');
    await craeteMessages(admins, job, "There is a new job application!");

    return job;
};

exports.archiveJob = async (userID, jobID) => {
    let job = await checkIfJobOwner(jobID, userID);

    job = await Job.findByIdAndUpdate(
        jobID,
        {
            isActive: false
        },
        {
            runValidators: true,
            new: true
        }
    ).populate('owner', 'businessName');

    return job;
};

exports.editJob = async (userID, jobID, title, description, salary, location, experience) => {
    let job = await checkIfJobOwner(jobID, userID);

    job = await Job.findByIdAndUpdate(
        jobID,
        {
            title,
            description,
            salary,
            location,
            experience
        },
        {
            runValidators: true,
            new: true
        }
    ).populate('owner', 'businessName');;

    return job;
};

exports.getAllActiveJobs = async () => {
    return await Job.find({ isActive: true }).populate('owner', 'businessName')
};

exports.getJob = async (jobID) => {
    if (!mongoose.isValidObjectId(jobID)) throw new Error(MESSAGES.jobNotFound);
    const job = await Job.findById(jobID).populate('owner');
    if (!job) throw new Error(MESSAGES.jobNotFound);
    return job
}

async function checkIfJobOwner(jobID, userID) {
    const job = await Job.findById(jobID).populate('owner', "owner")

    if (!job) {
        throw new Error(MESSAGES.invalidJobId);
    }

    let owner = job.owner.owner;
    if (owner instanceof mongoose.Types.ObjectId) {
        owner = owner.toHexString(); //checks if ownerID is of type ObjectId and transforms it to string
    }

    if (owner !== userID) {
        throw new Error(MESSAGES.unauthorized); //checks if the owner is the logged in user
    }

    if (!job.isActive) {
        throw new Error(MESSAGES.alreadyArchived); //checks if the job is archived
    }

    return job
}

async function craeteMessages(admins, job, context) {

    const messages = admins.map(admin => ({
        user: admin._id,
        Job: job._id,
        context,
        read: false
    }));

    await Message.insertMany(messages);

    const io = getIO();
    messages.forEach(message => {
        io.to(`user_${message.user}`).emit("message");
    });
}