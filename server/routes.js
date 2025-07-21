const router = require("express").Router();

const paths = {
    
}

router.all('/*splat', (req, res) => {
  res.status(404).json({ message: "Path not found!" });
});

module.exports = router;