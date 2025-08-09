const { MustNotBeSetup, MustBeSetup } = require('../middlewares/isSetupMiddleware');
const { formatErrorMessage } = require('../utils/errorMessage');
const { MESSAGES } = require('../utils/messages/Messages');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const router = require('express').Router();

const { PATHS } = require('../utils/paths');
const { getMessages } = require('../managers/messagesManager');

router.get(PATHS.me, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const messages = await getMessages(userID, 5);
        res.status(200).json(messages);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});


module.exports = router;