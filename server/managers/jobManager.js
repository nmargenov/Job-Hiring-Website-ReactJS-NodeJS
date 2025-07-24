const mongoose = require('mongoose');
const Business = require("../models/Business");
const Job = require("../models/Job");
const { MESSAGES } = require("../utils/messages/Messages");

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

    return job;
};

exports.archiveJob = async (userID, jobID) => {
    let job = await Job.findById(jobID).populate('owner',"owner")

    if (!job) {
        throw new Error(MESSAGES.invalidJobId);
    }

    let owner = job.owner.owner;
    if(owner instanceof mongoose.Types.ObjectId){
       owner = owner.toHexString();
    }

    if(owner !== userID){
        throw new Error(MESSAGES.unauthorized);
    }
    
    if(!job.isActive){
        throw new Error(MESSAGES.alreadyArchived);
    }
    
    job = await Job.findByIdAndUpdate(jobID,{isActive:false},{runValidators:true, new:true}).populate('owner','businessName');
    return job;
}

exports.getAllActiveJobs = async () => {
    return await Job.find({ isActive: true }).populate('owner', 'businessName')
};
