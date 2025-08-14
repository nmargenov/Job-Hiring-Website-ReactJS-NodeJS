const router = require('express').Router();

const { apply, editBusiness, getEdit } = require('../managers/businessManager');
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

router.patch(PATHS.businessID, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        console.log(req.body)
        const userID = req.user._id;
        const businessID = req.params?.businessID;
        const businessName = req.body?.businessName?.trim();
        const bio = req.body?.bio?.trim();
        const employeeCount = req.body?.employeeCount?.toString().trim();
        const token = await editBusiness(userID, businessID, businessName, bio, employeeCount);
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.get(PATHS.editBusiness, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const businessID = req.params?.businessID;
        const business = await getEdit(userID, businessID);
        res.status(200).json(business);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

module.exports = router;