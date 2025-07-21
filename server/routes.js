const router = require("express").Router();

const userController = require("./controllers/userController");

const paths = {
    users:"/api/users",
}

router.use(paths.users,userController);

router.all('/*splat', (req, res) => {
  res.status(404).json({ message: "Path not found!" });
});

module.exports = router;