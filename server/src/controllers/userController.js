const { getProfilePicture, getFile } = require('../managers/imageManager');
const { setupProfile, sendLoginCode, verifyLoginCode, sendEmailCode, verifyEmailCode, changeProfile, getCodeInfo, getProfile, setProfilePicture, deleteExistingProfilePicture, saveFile } = require('../managers/userManager');
const { mustBeGuest, mustBeAuth } = require('../middlewares/authMiddleware');
const { MustNotBeSetup, MustBeSetup } = require('../middlewares/isSetupMiddleware');
const { formatErrorMessage } = require('../utils/errorMessage');
const { MESSAGES } = require('../utils/messages/Messages');

const router = require('express').Router();

const { PATHS } = require('../utils/paths');

router.post(PATHS.email, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const newEmail = req.body?.newEmail?.trim();
        await sendEmailCode(userID, newEmail);
        res.status(200).send({ message: MESSAGES.codeSent });
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.post(PATHS.verifyEmailCode, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const code = req.body?.code?.trim();
        const token = await verifyEmailCode(userID, code);
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.post(PATHS.login, mustBeGuest, async (req, res) => {
    try {
        const email = req.body?.email?.trim();
        const id = await sendLoginCode(email);
        res.status(200).json(id);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.post(PATHS.verifyLoginCode, mustBeGuest, async (req, res) => {
    try {
        const email = req.body?.email?.trim();
        const code = req.body?.code?.trim();
        const token = await verifyLoginCode(email, code);
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.post(PATHS.setupProfile, mustBeAuth, MustNotBeSetup, async (req, res) => {
    try {
        const firstName = req.body?.firstName?.trim();
        const lastName = req.body?.lastName?.trim();
        const phone = req.body?.phone?.trim();
        const countryCode = req.body?.countryCode?.trim();
        const userID = req.user._id;
        const token = await setupProfile(userID, firstName, lastName, phone, countryCode);
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.patch(PATHS.userID, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const userID = req.params.userID;
        const firstName = req.body?.firstName?.trim();
        const lastName = req.body?.lastName?.trim();
        const phone = req.body?.phone?.trim();
        const countryCode = req.body?.countryCode?.trim();
        const token = await changeProfile(userID, loggedInUser, firstName, lastName, phone, countryCode);
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.get(PATHS.getCodeInfoById, mustBeGuest, async (req, res) => {
    try {
        const codeID = req.params?.codeID?.trim();
        const email = await getCodeInfo(codeID);
        res.status(200).json(email);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error })
    }
});

router.get(PATHS.profile, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const id = req.user._id;
        const user = await getProfile(id);
        res.status(200).json(user);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error })
    }
});

router.post(PATHS.profilePicture, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const id = req.user._id;
        const data = await getProfilePicture(req, res);
        const token = await setProfilePicture(id, data.image);
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.delete(PATHS.profilePicture, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const id = req.user._id;
        const token = await deleteExistingProfilePicture(id);
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.post(PATHS.files, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const id = req.user._id;
        const data = await getFile(req, res);
        const token = await saveFile(id, data.file);
        res.status(200).send({ message: 'yes' });
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

module.exports = router;