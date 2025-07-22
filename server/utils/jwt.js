const jsonwebtoken = require("jsonwebtoken");

exports.sign = (payload, secret, options) =>{
    return new Promise((resolve,reject)=>{
        jsonwebtoken.sign(payload,secret,options,(err,token)=>{
            if(err){
                return reject(err);
            } else{
                resolve(token)
            }
        });
    });
};

exports.verify = (payload, secret)=>{
    return new Promise((resolve,reject)=>{
        jsonwebtoken.verify(payload,secret,(err,token)=>{
            if(err){
                return reject(err);
            }else{
                resolve(token);
            }
        });
    });
}

exports.returnToken = async (user) => {
    let payload = {};
    if (!user.isApproved) {
        payload = {
            _id: user._id,
            firstName: user.firstName,
            role: user.role,
            isSetup: user.isSetup,
            hasApplied: user.hasBusinessApplication
        };
    } else {
        const userBusiness = await User.findById(user._id).populate('business');
        payload = {
            _id: user._id,
            businessID: userBusiness._id,
            businessName: userBusiness.business.businessName,
            role: user.role,
            isSetup: user.isSetup,
            isApproved: user.isApproved
        }
    }

    return await sign(payload, SECRET, { expiresIn: '7d' });
}