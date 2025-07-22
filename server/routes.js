const router = require("express").Router();

const userController = require("./controllers/userController");
const businessController = require("./controllers/businessController");

const { PATHS } = require("./utils/paths");

router.use(PATHS.users,userController);
router.use(PATHS.business,businessController);

router.all('/*splat', (req, res) => {
  res.status(404).json({ message: "Path not found!" });
});

module.exports = router;