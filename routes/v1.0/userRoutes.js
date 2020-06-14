var router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const jwtSecret = require("../../config/jwtConfig");

router.post("/login", (req, res, next) => {
  passport.authenticate("login", async (err, users, info) => {
    if (err) {
      console.error(`error ${err}`);
    }
    if (info !== undefined) {
      console.error(info.message);
      if (info.message === "bad username") {
        res.status(401).send(info.message);
      } else {
        res.status(403).send(info.message);
      }
    } else {
      req.logIn(users, async () => {
        const user = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
        const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
          expiresIn: 60 * 60,
        });
        res.status(200).send({
          auth: true,
          token,
          message: "user found & logged in",
        });
      });
    }
  })(req, res, next);
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
