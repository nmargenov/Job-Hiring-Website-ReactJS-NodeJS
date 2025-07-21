exports.MustBeSetup = (req,res,next)=>{
    try{
        if(!req.user?.isSetup){
            throw new Error('You must finish setting up your account');
        }else{
            next();
        }
    }catch(err){
        res.status(401).send({message:err.message});
    }
}

exports.MustNotBeSetup = (req,res,next)=>{
    try{
        console.log(req.user);
        if(req.user?.isSetup){
            throw new Error('Account setup has already been completed');
        }else{
            next();
        }
    }catch(err){
        res.status(401).send({message:err.message});
    }
}