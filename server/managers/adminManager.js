const Business = require("../models/Business");
const User = require("../models/User");
const { MESSAGES } = require("../utils/messages/Messages");

exports.acceptBusiness = async (userID, businessID) => {
    const admin = await User.findById(userID);
    if (!admin || !admin.isSetup || admin.role !== "admin") {
        throw new Error(MESSAGES.unauthorized);
    }

    const business = await Business.findById(businessID).populate('owner');

    if (!business || !business.owner.isSetup || business.owner.role !== "seeker" || business.owner.isApproved) {
        throw new Error(MESSAGES.forbidden);
    }

    const newUser = await User.findByIdAndUpdate(business.owner._id, { isApproved: true }, { runValidators: true, new: true });

    return newUser.populate('business');
};