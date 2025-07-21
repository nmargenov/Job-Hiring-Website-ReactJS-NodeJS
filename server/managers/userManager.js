const User = require("../models/User");
const LoginCode = require("../models/LoginCode");

const transporter = require("../config/nodemailerConfig");
const { emailRegex } = require("../utils/regex");
const { sign, verify } = require("../utils/jwt");

const SECRET = process.env.SECRET;

exports.sendCode = async (email) =>{
    const code = Math.floor(100000 + Math.random() * 900000).toString(); //6 digits code
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 mins

    if(!emailRegex.test(email)){
        throw new Error("Invalid email!"); // checks if the email is valid or not
    }

    const existing = await LoginCode.findOne({ email });
    console.log(new Date());
    console.log(existing);
    console.log(new Date);
    if (existing && new Date() - existing.updatedAt < 60 * 1000) {
        throw new Error('Please wait 60 seconds before requesting another code.'); //make sure only 1 code can be send in 1 minute timer (anti-spam)
    }


    await LoginCode.findOneAndUpdate(
        {email},
        {code, expiresAt},
        {upsert: true, new: true}
    ); //creates new login in the database or updates the existing code

    try{
        await transporter.sendMail({
            from: 'no-reply@jobsite.com',
            to: email,
            subject: 'Your Login Code',
            text: `Your login code is: ${code} and is valid for 10 minutes.`,
        });

        return {message:"Email sent"};
    }catch(err){
        return {message: err.message};
    }
}

exports.verifyCode = async (email,code) => {
    const login = await LoginCode.findOne({ email, code, expiresAt: { $gt: new Date() } }); // checks for login with email and code and valid expiresAt date 
    if(!login){
        throw new Error("Invalid or expired login code!");
    }

    let user = await User.findOne({email}); //checks for existing user
    if(!user){
        user = await User.create({email}); //creates an user if not existing
    }

    await LoginCode.deleteMany({email}); //deletes all existing codes for the user in the database(manages storage)

    const token = returnToken(user);
    return token;
    
}

async function returnToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    };

    return await sign(payload, SECRET, {expiresIn: '7d'});
}