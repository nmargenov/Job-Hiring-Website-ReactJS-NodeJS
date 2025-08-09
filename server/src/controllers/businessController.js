const router = require('express').Router();

const { apply, editBusiness } = require('../managers/businessManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const { MustBeSetup } = require('../middlewares/isSetupMiddleware');
const { formatErrorMessage } = require('../utils/errorMessage');
const { PATHS } = require('../utils/paths');


router.post(PATHS.businessApply, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const businessName = req.body.businessName?.trim();
        const bio = req.body.bio?.trim();
        const employeeCount = req.body.employeeCount?.trim();
        const token = await apply(userID, businessName, bio, employeeCount);
        
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.patch(PATHS.businessApply, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const businessName = req.body.businessName?.trim();
        const bio = req.body.bio?.trim();
        const employeeCount = req.body.employeeCount?.trim();
        const token = await editBusiness(userID, businessName, bio, employeeCount, token);
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

module.exports = router;