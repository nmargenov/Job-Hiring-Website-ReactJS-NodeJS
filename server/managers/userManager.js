const User = require("../models/User");
const LoginCode = require("../models/LoginCode");
const EmailCode = require("../models/EmailCode");

const transporter = require("../config/nodemailerConfig");
const { emailRegex } = require("../utils/regex");
const { returnToken } = require("../utils/jwt");
const { MESSAGES } = require('../utils/messages/Messages');

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

    await model.findOneAndUpdate(
        { email },
        { code:toUpdate.code, expiresAt:toUpdate.expiresAt, newEmail: toUpdate.newEmail },
        { upsert: true, new: true }
    ); //creates new login in the database or updates the existing code
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

    if(!user){
        throw new Error(MESSAGES.userNotFound);
    }

    const email = user.email;

    await emailCheck(email); //checks old email
    
    
    if(!newEmail) throw new Error(MESSAGES.invalidEmail); //make sure new email exists
    
    await emailCheck(newEmail); // checks new email

    await antispamCode(EmailCode, email);

    await createDatabaseEntry(EmailCode, email, code, expiresAt, newEmail);

    await sendEmail(email, 'Email change code', `You want to change your email to ${newEmail} and your email change code is: ${code} and is valid for 10 minutes.`);
}

exports.sendLoginCode = async (email) => {
    const [code, expiresAt] = generateCode();

    await emailCheck(email);

    await antispamCode(LoginCode, email);

    await createDatabaseEntry(LoginCode, email, code, expiresAt);

    await sendEmail(email, 'Login code', `Your login code is: ${code} and is valid for 10 minutes.`);
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

