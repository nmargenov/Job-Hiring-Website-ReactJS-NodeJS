const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.SECRET;

const sign = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, secret, options, (err, token) => {
            if (err) {
                return reject(err);
            } else {
                resolve(token)
            }
        });
    });
};

exports.verify = (payload, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(payload, secret, (err, token) => {
            if (err) {
                return reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

exports.returnToken = async (user) => {
    console.log(user);
    let payload = {
        _id: user._id,
        role: user.role,
        isSetup: user.isSetup,
        profilePicture: user.profilePicture
    };
    if (!user.isApproved) {
        payload['firstName'] = user.firstName;
        payload['lastName'] = user.lastName;
    }
    else {
        const userBusiness = await User.findById(user._id).populate('business');
        payload['businessID'] = userBusiness._id
        payload['businessName'] = userBusiness.business.businessName;
    }

    return await sign(payload, SECRET, { expiresIn: '7d' });
}
