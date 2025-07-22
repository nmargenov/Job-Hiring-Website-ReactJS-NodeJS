const User = require("../models/User");
const LoginCode = require("../models/LoginCode");

const transporter = require("../config/nodemailerConfig");
const { emailRegex } = require("../utils/regex");
const { returnToken } = require("../utils/jwt");
const { MESSAGES } = require('../utils/messages/Messages');

exports.sendCode = async (email) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); //6 digits code
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 mins

    if (!emailRegex.test(email)) {
        throw new Error(MESSAGES.invalidEmail); // checks if the email is valid or not
    }

    const existing = await LoginCode.findOne({ email });
    if (existing && new Date() - existing.updatedAt < 60 * 1000) {
        throw new Error(MESSAGES.timeInterval); //make sure only 1 code can be send in 1 minute timer (anti-spam)
    }


    await LoginCode.findOneAndUpdate(
        { email },
        { code, expiresAt },
        { upsert: true, new: true }
    ); //creates new login in the database or updates the existing code

    try {
        await transporter.sendMail({
            from: 'no-reply@jobsite.com',
            to: email,
            subject: 'Your Login Code',
            text: `Your login code is: ${code} and is valid for 10 minutes.`,
        });

        return { message: MESSAGES.emailSent };
    } catch (err) {
        return { message: err.message };
    }
}

exports.verifyCode = async (email, code) => {
    const login = await LoginCode.findOne({ email, code, expiresAt: { $gt: new Date() } }); // checks for login with email and code and valid expiresAt date 
    if (!login) {
        throw new Error(MESSAGES.invalidCode);
    }

    let user = await User.findOne({ email }); //checks for existing user
    if (!user) {
        user = await User.create({ email }); //creates an user if not existing
    }

    await LoginCode.deleteMany({ email }); //deletes all existing codes for the user in the database(manages storage)

    const token = returnToken(user);
    return token;

}

exports.setupProfile = async (userID, firstName, lastName, phone) => {

    const user = await User.findById(userID);
    if (!user) {
        throw new Error(MESSAGES.userNotFound);
    }

    if (user.isSetup) {
        throw new Error(MESSAGES.alreadyCompletedSetup)
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.isSetup = true;

    await user.save(); //Will throw if firstName, lastName, or phone are invalid

    return returnToken(user);
};

async function changeFirstName(userID, firstName) {
    return user = await User.findByIdAndUpdate(userID, { firstName });
}

async function changeLastName(userID, lastName) {
    return user = await User.findByIdAndUpdate(userID, { lastName });
}

async function changePhoneNumber(userID, phone) {
    return user = await User.findByIdAndUpdate(userID, { phone });
}

