var router = require("express").Router();
const passport = require("passport");
router.get("/login", (req, res) => {
  res.send("hihii");
  passport.authenticate("login", { session: false });
});

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("register", (err, user, info) => {
    // res.status(403).send(info.message);
    console.log(user);
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else {
      // console.log(user);
      req.logIn(user, (error) => {
        console.log(user);
        res.status(200).send({ message: "user created" });
      });
    }
  })(req, res, next);
});

module.exports = router;
