const Business = require("../models/Business");
const Message = require("../models/Message");
const User = require("../models/User");
const { returnToken } = require("../utils/jwt");
const { MESSAGES } = require("../utils/messages/Messages");
const { getIO } = require("../socket.js");
const EditBusiness = require("../models/EditBusiness.js");

exports.apply = async (userID, businessName, bio, employeeCount) => {
    let user = await User.findById(userID);
    if (!user || user.role !== "seeker" || !user.isSetup || user.hasBusinessApplication || user.isApproved) {
        throw new Error(MESSAGES.forbidden); // checks if there is a user, role seeker, has finished setup and hasnt applied yet
    }

    const business = await Business.create({ owner: userID, businessName, bio, employeeCount });

    user = await User.findByIdAndUpdate(userID, { hasBusinessApplication: true, business: business._id }, { runValidators: true, new: true }).populate('business'); //sets application

    const admins = await User.find({ role: 'admin' }).select('_id');

    await craeteMessages(admins, business, 'There is a new business application!');

    return returnToken(user);
};

exports.editBusiness = async (userID, businessID, businessName, bio, employeeCount) => {
    const business = await Business.findOne({ owner: userID }).populate('owner');

    if (!business || business._id != businessID) throw new Error(MESSAGES.unauthorized);

    if (business.hasEdit) throw new Error(MESSAGES.forbidden);

    await EditBusiness.create({ business: business._id, businessName, bio, employeeCount });
    await Business.findByIdAndUpdate(business._id, { hasEdit: true }, { runValidators: true });

    const user = await User.findById(userID);

    const admins = await User.find({ role: 'admin' }).select('_id');
    await craeteMessages(admins, business, 'There is a new business edit application!');

    return returnToken(user);
};

exports.getEdit = async (userID, businessID) => {
    let business = await EditBusiness.findOne({ business: businessID }).populate('business');
    if (business && business?.business.owner != userID) throw new Error(MESSAGES.unauthorized);

    if (business) {
        const toReturn = business.toObject();;
        toReturn['hasEdit'] = true
        return toReturn;
    }
    
    console.log(businessID);
    business = await Business.findById(businessID);
    console.log(business);
    if (business.owner != userID) throw new Error(MESSAGES.unauthorized);

    return business;
}

async function craeteMessages(admins, business, context) {

    const messages = admins.map(admin => ({
        user: admin._id,
        business: business._id,
        context,
        read: false
    }));

    await Message.insertMany(messages);

    const io = getIO();
    messages.forEach(message => {
        io.to(`user_${message.user}`).emit("message");
    });
}