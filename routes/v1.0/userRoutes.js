var router = require("express").Router();
router.get("/login", (req, res) => {
  res.send("hihii");
});

module.exports = router;
