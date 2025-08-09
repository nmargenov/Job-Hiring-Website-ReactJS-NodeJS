const { MustNotBeSetup, MustBeSetup } = require('../middlewares/isSetupMiddleware');
const { formatErrorMessage } = require('../utils/errorMessage');
const { MESSAGES } = require('../utils/messages/Messages');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const router = require('express').Router();

const { PATHS } = require('../utils/paths');
const { getMessages, readMessages, readMessage } = require('../managers/messagesManager');

router.get(PATHS.me, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const { page = 0, limit = 5 } = req.query;
        const userID = req.user._id;
        const messages = await getMessages(userID, page, limit);
        res.status(200).json(messages);
    } catch (err) {
        const error = formatErrorMessage(err);
        console.log(err);
        res.status(400).send({ message: error });
    }
});

router.patch(PATHS.message, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const message = req.params.messageID;
        const newMessage = await readMessage(userID, message);
        res.status(200).send(newMessage);
    } catch (err) {
        const error = formatErrorMessage(err);
        console.log(err);
        res.status(400).send({ message: error });
    }
});


module.exports = router;