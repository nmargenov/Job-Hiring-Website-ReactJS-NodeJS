const User = require("../models/User");
const LoginCode = require("../models/LoginCode");
const EmailCode = require("../models/EmailCode");
const mongoose = require('mongoose');
const fs = require('fs');

const transporter = require("../config/nodemailerConfig");
const { emailRegex } = require("../utils/regex");
const { returnToken } = require("../utils/jwt");
const { MESSAGES } = require('../utils/messages/Messages');
const { deleteImageFromCloud, getFile } = require("./imageManager");

function generateCode() {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); //6 digits code
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 mins
    return [code, expiresAt];
}

function emailCheck(email) {
    if (!emailRegex.test(email)) {
        throw new Error(MESSAGES.invalidEmail); // checks if the email is valid or not
    }
}

async function antispamCode(model, email) {
    const existing = await model.findOne({ email });
    if (existing && new Date() - existing.updatedAt < 60 * 1000) {
        throw new Error(MESSAGES.timeInterval); //make sure only 1 code can be send in 1 minute timer (anti-spam)
    }
}

async function createDatabaseEntry(model, email, code, expiresAt, newEmail) {
    const toUpdate = { code, expiresAt };
    model === EmailCode ? (toUpdate['oldEmail'] = email, toUpdate['newEmail'] = newEmail) : null;

    const entry = await model.findOneAndUpdate(
        { email },
        { code: toUpdate.code, expiresAt: toUpdate.expiresAt, newEmail: toUpdate.newEmail },
        { upsert: true, new: true }
    ); //creates new login in the database or updates the existing code

    return entry;
}

async function sendEmail(email, subject, text) {

    try {
        await transporter.sendMail({
            from: 'no-reply@jobsite.com',
            to: email,
            subject,
            text
        });

        return { message: MESSAGES.emailSent };
    } catch (err) {
        return { message: err.message };
    }
}

exports.sendEmailCode = async (userID, newEmail) => {
    const [code, expiresAt] = generateCode();

    const user = await User.findById(userID);

    if (!user) {
        throw new Error(MESSAGES.userNotFound);
    }

    const email = user.email;

    await emailCheck(email); //checks old email


    if (!newEmail) throw new Error(MESSAGES.invalidEmail); //make sure new email exists

    await emailCheck(newEmail); // checks new email

    await antispamCode(EmailCode, email);

    await createDatabaseEntry(EmailCode, email, code, expiresAt, newEmail);

    await sendEmail(email, 'Email change code', `You want to change your email to ${newEmail} and your email change code is: ${code} and is valid for 10 minutes.`);
}

exports.sendLoginCode = async (email) => {
    const [code, expiresAt] = generateCode();

    await emailCheck(email);

    await antispamCode(LoginCode, email);

    const dbEntry = await createDatabaseEntry(LoginCode, email, code, expiresAt);

    await sendEmail(email, 'Login code', `Your login code is: ${code} and is valid for 10 minutes.`);

    return dbEntry._id;
}

exports.verifyEmailCode = async (userID, code) => {
    let user = await User.findById(userID);
    if (!user) throw new Error(MESSAGES.userNotFound);
    if (!user.isSetup) throw new Error(MESSAGES.mustFinishSetup);

    const emailEntry = await EmailCode.findOne({ email: user.email, code, expiresAt: { $gt: new Date() } }); // checks for email with email and code and valid expiresAt date 
    if (!emailEntry) throw new Error(MESSAGES.invalidCode);

    user.email = emailEntry.newEmail;

    const newUser = await user.save();

    await EmailCode.deleteMany({ email: user.email });

    return returnToken(newUser);
}

exports.verifyLoginCode = async (email, code) => {
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

exports.setupProfile = async (userID, firstName, lastName, phone, countryCode) => {

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
    if (countryCode) user.countryCode = countryCode;
    user.isSetup = true;

    await user.save(); //Will throw if firstName, lastName, or phone are invalid

    return returnToken(user);
};

exports.changeProfile = async (userID, loggedInUser, firstName, lastName, phone, countryCode) => {

    let user = await User.findById(userID);
    if (!user) throw new Error(MESSAGES.userNotFound);

    let profileID = user._id;
    if (profileID instanceof mongoose.Types.ObjectId) {
        profileID = profileID.toHexString(); //checks if ownerID is of type ObjectId and transforms it to string
    }

    if (profileID !== loggedInUser) {
        throw new Error(MESSAGES.unauthorized); //checks if the owner is the logged in user
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (countryCode) user.countryCode = countryCode;
    if (!countryCode) user.countryCode = '';

    user = await user.save();

    return returnToken(user);
};

exports.getCodeInfo = async (codeID) => {
    let email = await LoginCode.findById(codeID).select('email');

    if (!email) {
        throw new Error(MESSAGES.invalidEmail);
    }

    return email;
};

exports.getProfile = async (userID) => {
    let user = await User.findById(userID).populate('business');

    if (!user) {
        throw new Error();
    }
    return user;
};

exports.setProfilePicture = async (userID, image) => {
    const user = await User.findById(userID);

    deleteOldPicture(user);
    deleteImageFromCloud(user.profilePicture)
    user.profilePicture = image;
    const newUser = await user.save();

    return returnToken(newUser);
};

exports.deleteExistingProfilePicture = async (userID) => {
    const user = await User.findById(userID);

    deleteOldPicture(user);
    deleteImageFromCloud(user.profilePicture);

    user.profilePicture = null;
    const newUser = await user.save();

    return returnToken(newUser);
}

const deleteOldPicture = async (user) => {
    if (process.env.STORAGE === 'Cloud') {
        return;
    }
    if (user.profilePicture) {
        const path = user.profilePicture.replace(/\\/g, '/');
        fs.access(path, (err) => {
            if (err) {
                return null;
            } else {
                fs.unlink(path, (err) => { });
            }
        });
    }
}

exports.saveFile = async (userID, req, res) => {
    const user = await User.findById(userID);
    if (!user) {
        throw new Error(MESSAGES.userNotFound);
    }

    if (user.files?.length >= 4) {
        throw new Error(MESSAGES.maxFiles);
    }
    const data = await getFile(req, res);
    user.files = [...(user.files || []), { originalName: data.fileName, url: data.filePath, type: data.type }];

    const newUser = await user.save();

    return newUser.files;
}

exports.getFiles = async (userID) => {
    const user = await User.findById(userID);
    if (!user) {
        throw new error(MESSAGES.userNotFound);
    }

    return user.files;
}

exports.deleteFile = async (userID, fileID, req) => {
    const user = await User.findById(userID);
    if (!user) {
        throw new error(MESSAGES.userNotFound);
    }

    const file = user.files.find((file) => file._id == fileID);
    if (!file) {
        throw new Error(MESSAGES.fileNotFound);
    }
    deleteFileLocaly(file, req);
    deleteImageFromCloud(file.url);

    user.files = user.files.filter(f => f._id.toString() !== fileID);
    const newUser = await user.save();

    return newUser.files;
}


const deleteFileLocaly = async (file, req) => {
    if (process.env.STORAGE === 'Cloud') {
        return;
    }
    const path = file.url.replace(`${req.protocol}://${req.get('host')}/`, 'src/');
    fs.access(path, (err) => {
        if (err) {
            return null;
        } else {
            fs.unlink(path, (err) => { });
        }
    });
}

exports.me = async (userID) => {
    const user = await User.findById(userID).populate('business');
    return returnToken(user);
}