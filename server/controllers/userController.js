const { sendCode, verifyCode, setupProfile } = require('../managers/userManager');
const { mustBeGuest, mustBeAuth } = require('../middlewares/authMiddleware');
const { MustNotBeSetup } = require('../middlewares/isSetupMiddleware');
const { formatErrorMessage } = require('../utils/errorMessage');
const { MESSAGES } = require('../utils/messages/Messages');

const router = require('express').Router();

const { PATHS } = require('../utils/paths');

router.post(PATHS.login, mustBeGuest,async (req,res)=>{
    try{
        const email = req.body.email?.trim();
        await sendCode(email);
        res.status(200).send({message: MESSAGES.codeSent});
    }catch(err){
        const error = formatErrorMessage(err);
        res.status(400).send({message: error});
    }
});

router.post(PATHS.verifyCode, mustBeGuest, async(req,res)=>{
    try{
        const email = req.body.email?.trim();
        const code = req.body.code?.trim();
        const token = await verifyCode(email,code);
        res.status(200).json(token);
    }catch(err){
        const error = formatErrorMessage(err);
        res.status(400).send({message: error});    }
});

router.post(PATHS.setupProfile, mustBeAuth, MustNotBeSetup, async (req,res) =>{
    try{
        const firstName = req.body.firstName?.trim();
        const lastName = req.body.lastName?.trim();
        const phone = req.body.phone?.trim();
        const userID = req.user._id;
        const token = await setupProfile(userID,firstName,lastName,phone);
        res.status(200).json(token);
    }catch(err){
        const error = formatErrorMessage(err);
        res.status(400).send({message: error});    }
});

module.exports = router;