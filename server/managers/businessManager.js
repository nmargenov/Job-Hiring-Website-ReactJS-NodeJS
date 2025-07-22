const Business = require("../models/Business");
const User = require("../models/User");
const { returnToken } = require("../utils/jwt");
const { MESSAGES } = require("../utils/messages/Messages");

exports.apply = async (userID,businessName,bio,employeeCount) =>{
    let user = await User.findById(userID);
    if(!user || user.role !== "seeker" || !user.isSetup || user.hasBusinessApplication || user.isApproved){
        throw new Error(MESSAGES.forbidden); // checks if there is a user, role seeker, has finished setup and hasnt applied yet
    }

    const business = await Business.create({owner:userID,businessName,bio,employeeCount});
    
    user = await User.findByIdAndUpdate(userID, {hasBusinessApplication:true, business: business._id}); //sets application

    return returnToken(user);
}