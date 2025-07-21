const { sendCode } = require('../managers/userManager');

const router = require('express').Router();

const paths = {
    login: '/login'
}

router.post(paths.login,async (req,res)=>{
    try{
        const email = req.body.email?.trim();
        await sendCode(email);
        res.status(200).send({message:"Code is sent successfully!"});
    }catch(err){
        res.status(400).send({message: err.message});
    }
})

module.exports = router;