var router = require("express").Router();
const passport = require("passport");
router.get("/login", (req, res) => {
  res.send("hihii");
  passport.authenticate("jwt", { session: false });
});

module.exports = router;
