const Business = require("../models/Business");
const Message = require("../models/Message");
const User = require("../models/User");
const { returnToken } = require("../utils/jwt");
const { MESSAGES } = require("../utils/messages/Messages");
const { getIO } = require("../socket.js");

exports.apply = async (userID, businessName, bio, employeeCount) => {
    let user = await User.findById(userID);
    if (!user || user.role !== "seeker" || !user.isSetup || user.hasBusinessApplication || user.isApproved) {
        throw new Error(MESSAGES.forbidden); // checks if there is a user, role seeker, has finished setup and hasnt applied yet
    }

    const business = await Business.create({ owner: userID, businessName, bio, employeeCount });

    user = await User.findByIdAndUpdate(userID, { hasBusinessApplication: true, business: business._id }, { runValidators: true, new: true }).populate('business'); //sets application

    const admins = await User.find({ role: 'admin' }).select('_id');

    const messages = admins.map(admin => ({
        user: admin._id,
        business: business._id,
        context: "There is a new business application!",
        read: false,
    }));
  
    await Message.insertMany(messages);
  
    const io = getIO();
    messages.forEach(message => {
        io.to(`user_${message.user}`).emit("message");
    });
    
    return returnToken(user);
};

exports.editBusiness = async (userID, businessName, bio, employeeCount) => {
    const business = await Business.find({ owner: userID }).populate('owner');

    if (!business) throw new Error(MESSAGES.unauthorized);

    await Business.findByIdAndUpdate(business._id, { businessName, bio, employeeCount }, { runValidators: true });

    const user = await User.findById(userID);

    return returnToken(user);
};