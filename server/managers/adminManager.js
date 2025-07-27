const Business = require("../models/Business");
const User = require("../models/User");
const { MESSAGES } = require("../utils/messages/Messages");

exports.acceptBusiness = async (userID, businessID) => {
    await checkIfAdmin(userID);

    const business = await checkBusiness(businessID);

    const newUser = await User.findByIdAndUpdate(business.owner._id, { isApproved: true }, { runValidators: true, new: true });

    return newUser.populate('business');
};

exports.declineBusiness = async (userID, businessID) => {
    const admin = await checkIfAdmin(userID);

    const business = await checkBusiness(businessID);

    const user = await User.findByIdAndUpdate(business.owner._id, { hasBusinessApplication: false, business: null }, { runValidators: true, new: true });

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