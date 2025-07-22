const router = require('express').Router();

const { apply } = require('../managers/businessManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const { MustBeSetup } = require('../middlewares/isSetupMiddleware');
const { formatErrorMessage } = require('../utils/errorMessage');
const { PATHS } = require('../utils/paths');

router.post(PATHS.businessApply, mustBeAuth, MustBeSetup, async (req,res)=>{
    try{
        const userID = req.user._id;
        const businessName = req.body.businessName?.trim();
        const bio = req.body.bio?.trim();
        const employeeCount = req.body.employeeCount?.trim();
        const message = await apply(userID,businessName,bio,employeeCount);
        res.status(200).send({message});
    }catch(err){
        const error = formatErrorMessage(err);
        res.status(400).send({message: error});
    }
});

module.exports = router;