const Business = require("../models/Business");
const Job = require("../models/Job");
const Message = require("../models/Message");
const User = require("../models/User");
const { MESSAGES } = require("../utils/messages/Messages");
const { getIO } = require("../socket.js");
const EditBusiness = require("../models/EditBusiness.js");

exports.acceptBusiness = async (userID, businessID) => {
    await checkIfAdmin(userID);

    const business = await checkBusiness(businessID);
    const newUser = await User.findByIdAndUpdate(business.owner._id, { role: "hirer", isApproved: true }, { runValidators: true, new: true });

    const message = await Message.create({
        user: newUser._id,
        context: "Your business application has been accepted!",
        read: false
    });

    await deleteMessageForAdminsBusiness(businessID);
    return newUser.populate('business');
};

exports.getPendingBusinesses = async (userID, page, limit) => {
    await checkIfAdmin(userID);

    const result = await Business.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        { $unwind: '$owner' },
        { $match: { 'owner.isApproved': false } },
        {
            $facet: {
                data: [
                    { $sort: { createdAt: -1 } },
                    { $skip: parseInt(page) * parseInt(limit) },
                    { $limit: parseInt(limit) }
                ],
                totalCount: [
                    { $count: 'count' }
                ]
            }
        }
    ]);

    const businesses = result[0].data;
    const total = result[0].totalCount[0]?.count || 0;

    return {
        businesses,
        hasMore: total > (parseInt(page) + 1) * parseInt(limit)
    };
}

exports.getBusinesses = async (userID, page, limit) => {
    await checkIfAdmin(userID);

    const businesses = await Business.find()
        .populate('owner')
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(parseInt(limit));

    const total = await Business.countDocuments();

    return {
        businesses,
        hasMore: total > (parseInt(page) + 1) * parseInt(limit)
    }

}

exports.declineBusiness = async (userID, businessID) => {
    await checkIfAdmin(userID);

    const business = await checkBusiness(businessID);

    const user = await User.findByIdAndUpdate(business.owner._id, { hasBusinessApplication: false, business: null }, { runValidators: true, new: true });

    await Business.findByIdAndDelete(businessID);

    const message = await Message.create({
        user: user._id,
        context: "Your business application has been declined! You can request again",
        read: false
    });
    await deleteMessageForAdminsBusiness(businessID);

    return user;
}

exports.AcceptBusinessEdit = async (userID, businessID) => {
    await checkIfAdmin(userID);

    const user = await User.findOne({ business: businessID }).populate('business');
    if (!user.business.hasEdit) throw new Error(MESSAGES.forbidden);
    if (!user) throw new Error(MESSAGES.userNotFound);

    const businessEdit = await EditBusiness.findOne({ business: businessID });
    if (!businessEdit) throw new Error(MESSAGES.forbidden);

    await Business.findByIdAndUpdate(businessID,
        {
            businessName: businessEdit.businessName,
            bio: businessEdit.bio,
            employeeCount: businessEdit.employeeCount,
            hasEdit: false
        }
        , { runValidators: true });

    await EditBusiness.findOneAndDelete({ business: businessID });

    const message = await Message.create({
        user: user._id,
        context: "Your business edit application has been accepted!",
        read: false
    });
    await deleteMessageForAdminsBusiness(businessID);

    return user;
}

exports.declineBusinessEdit = async (userID, businessID) => {
    await checkIfAdmin(userID);

    const user = await User.findOne({ business: businessID }).populate('business');
    if (!user.business.hasEdit) throw new Error(MESSAGES.forbidden);
    if (!user) throw new Error(MESSAGES.userNotFound);

    const businessEdit = await EditBusiness.findOne({ business: businessID });
    if (!businessEdit) throw new Error(MESSAGES.forbidden);

    await EditBusiness.findOneAndDelete({ business: businessID });

    const message = await Message.create({
        user: user._id,
        context: "Your business edit application has been declined! You can request again",
        read: false
    });
    await deleteMessageForAdminsBusiness(businessID);

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

exports.getBusiness = async (userID, businessID) => {
    await checkIfAdmin(userID);

    const businesses = await Business.findById(businessID).populate('owner');

    return businesses;
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

const deleteMessageForAdminsBusiness = async (businessID) => {
    await Message.deleteMany({ business: businessID })
    const io = getIO();
    io.to('admins').emit("admin-deleted-message", { businessID });
}
