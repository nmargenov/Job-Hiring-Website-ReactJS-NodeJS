const router = require("express").Router();

const userController = require("./controllers/userController");
const businessController = require("./controllers/businessController");

const paths = {
    users:"/api/users",
    business:"/api/business",
}

router.use(paths.users,userController);
router.use(paths.business,businessController);

router.all('/*splat', (req, res) => {
  res.status(404).json({ message: "Path not found!" });
});

module.exports = router;