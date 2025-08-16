const { acceptBusiness, declineBusiness, deleteBusiness, getPendingBusinesses, getBusiness, getBusinesses, AcceptBusinessEdit, declineBusinessEdit, makeAdmin, deleteAdmin } = require('../managers/adminManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const { MustBeSetup } = require('../middlewares/isSetupMiddleware');
const { formatErrorMessage } = require('../utils/errorMessage');
const { PATHS } = require('../utils/paths');
const { getIO } = require("../socket.js");
const router = require('express').Router();

router.post(PATHS.acceptBusiness, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const businessID = req.params.businessID;
        const user = await acceptBusiness(userID, businessID);
        const io = getIO();
        io.to(`user_${user._id}`).emit("roleChanged");
        io.to(`user_${user._id}`).emit("message");
        res.status(200).json(user);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.get(PATHS.pendingBusinesses, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const { page = 0, limit = 5 } = req.query;
        const busineeses = await getPendingBusinesses(userID, page, limit);
        res.status(200).json(busineeses);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.post(PATHS.declineBusiness, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const businessID = req.params.businessID;
        const user = await declineBusiness(userID, businessID);
        const io = getIO();
        io.to(`user_${user._id}`).emit("message");
        res.status(200).json(user);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.delete(PATHS.adminBusiness, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const businessID = req.params.businessID;
        const user = await deleteBusiness(userID, businessID);
        res.status(200).json(user);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.get(PATHS.adminBusiness, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const businessID = req.params.businessID;
        const business = await getBusiness(userID, businessID);
        res.status(200).json(business);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.get(PATHS.businesses, mustBeAuth, async (req, res) => {
    try {
        const userID = req.user._id;
        const { page = 0, limit = 5 } = req.query;
        const business = await getBusinesses(userID, page, limit);
        res.status(200).json(business);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.post(PATHS.acceptEditBusiness, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const businessID = req.params.businessID;
        const business = await AcceptBusinessEdit(userID, businessID);
        const io = getIO();
        io.to(`user_${business.owner._id}`).emit("roleChanged");
        io.to(`user_${business.owner._id}`).emit("message");
        res.status(200).json(business);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.post(PATHS.declineEditBusiness, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const businessID = req.params.businessID;
        const user = await declineBusinessEdit(userID, businessID);
        const io = getIO();
        io.to(`user_${user._id}`).emit("message");
        res.status(200).json(user);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.post(PATHS.makeAdmin, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const adminEmail = req.params.email;
        const user = await makeAdmin(userID, adminEmail);
        res.status(200).json(user);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.delete(PATHS.makeAdmin, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const adminEmail = req.params.email;
        const user = await deleteAdmin(userID, adminEmail);
        res.status(200).json(user);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

module.exports = router;