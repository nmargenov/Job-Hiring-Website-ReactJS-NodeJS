const { MESSAGES } = require("../utils/messages/Messages");

exports.MustBeSetup = (req,res,next)=>{
    try{
        if(!req.user?.isSetup){
            throw new Error(MESSAGES.mustFinishSetup);
        }else{
            next();
        }
    }catch(err){
        res.status(401).send({message:err.message});
    }
}

exports.MustNotBeSetup = (req,res,next)=>{
    try{
        if(req.user?.isSetup){
            throw new Error(MESSAGES.mustNotBeFinishedSetup);
        }else{
            next();
        }
    }catch(err){
        res.status(401).send({message:err.message});
    }
}