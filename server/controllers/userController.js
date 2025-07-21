const { sendCode, verifyCode } = require('../managers/userManager');

const router = require('express').Router();

const paths = {
    login: '/login',
    verifyCode: '/verifycode'
}

router.post(paths.login,async (req,res)=>{
    try{
        const email = req.body.email?.trim();
        await sendCode(email);
        res.status(200).send({message:"Code is sent successfully!"});
    }catch(err){
        res.status(400).send({message: err.message});
    }
});

router.post(paths.verifyCode, async(req,res)=>{
    try{
        const email = req.body.email?.trim();
        const code = req.body.code?.trim();
        const token = await verifyCode(email,code);
        res.status(200).json(token);
    }catch(err){
        res.status(400).send({message: err.message});
    }
});

module.exports = router;