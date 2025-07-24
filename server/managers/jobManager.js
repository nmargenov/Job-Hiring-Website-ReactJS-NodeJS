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

exports.getAllActiveJobs = async () => {
    return await Job.find({ isActive: true }).populate('owner', 'businessName')
};
