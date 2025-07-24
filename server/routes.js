const router = require("express").Router();

const userController = require("./controllers/userController");
const businessController = require("./controllers/businessController");
const jobsController = require("./controllers/jobController");

const { PATHS } = require("./utils/paths");

router.use(PATHS.users,userController);
router.use(PATHS.business,businessController);
router.use(PATHS.jobs,jobsController);

router.all('/*splat', (req, res) => {
  res.status(404).json({ message: "Path not found!" });
});

module.exports = router;