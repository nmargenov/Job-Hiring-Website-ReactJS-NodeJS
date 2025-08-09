const Business = require("../models/Business");
const Job = require("../models/Job");
const Message = require("../models/Message");
const User = require("../models/User");
const { MESSAGES } = require("../utils/messages/Messages");

exports.acceptBusiness = async (userID, businessID) => {
    await checkIfAdmin(userID);

    // const business = await checkBusiness(businessID);
    const business = await Business.findById(businessID);
    const newUser = await User.findByIdAndUpdate(business.owner._id, { role: "hirer", isApproved: true }, { runValidators: true, new: true });

    const message = await Message.create({
        user: newUser._id,
        context: "Your business application has been accepted!",
        read:false
    });

    return newUser.populate('business');
};

exports.declineBusiness = async (userID, businessID) => {
    await checkIfAdmin(userID);

    const business = await checkBusiness(businessID);

    const user = await User.findByIdAndUpdate(business.owner._id, { hasBusinessApplication: false, business: null }, { runValidators: true, new: true });

    await Business.findByIdAndDelete(businessID);

    return user;
}

exports.deleteBusiness = async (userID, businessID) => {
    await checkIfAdmin(userID);

    const business = await Business.findById(businessID).populate('owner');

    if (!business || !business.owner.isSetup || business.owner.role !== "hirer" || !business.owner.isApproved) {
        throw new Error(MESSAGES.forbidden);
    }

    const user = await User.findByIdAndUpdate(business.owner._id, { isApproved: false, hasBusinessApplication: false, business: null, role: "seeker" }, { runValidators: true, new: true });

    await Job.deleteMany({ owner: business._id });

    await Business.findByIdAndDelete(businessID);

    return user;
}


async function checkIfAdmin(userID) {
    const admin = await User.findById(userID);
    if (!admin || !admin.isSetup || admin.role !== "admin") {
        throw new Error(MESSAGES.unauthorized);
    }

    return admin;
}

async function checkBusiness(businessID) {
    const business = await Business.findById(businessID).populate('owner');

    if (!business || !business.owner.isSetup || business.owner.role !== "seeker" || business.owner.isApproved) {
        throw new Error(MESSAGES.forbidden);
    }

    return business;
}