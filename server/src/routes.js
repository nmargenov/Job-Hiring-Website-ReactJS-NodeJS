const router = require("express").Router();

const userController = require("./controllers/userController");
const businessController = require("./controllers/businessController");
const jobsController = require("./controllers/jobController");
const adminController = require("./controllers/adminController");
const messageController = require("./controllers/messageController");

const { PATHS } = require("./utils/paths");

router.use(PATHS.users,userController);
router.use(PATHS.business,businessController);
router.use(PATHS.jobs,jobsController);
router.use(PATHS.admin,adminController);
router.use(PATHS.messages,messageController);

router.all('/*splat', (req, res) => {
  res.status(404).json({ message: "Path not found!" });
});

module.exports = router;