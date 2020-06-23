var router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const jwtSecret = require("../../config/jwtConfig");
const { v4: uuid } = require("uuid");
const redisClient = require("../../services/redis-client");

const errHandler = (err) => {
  console.log("Error :: " + err);
};

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
        const refreshToken = jwt.sign(
          { id: user.id, email: user.email },
          jwtSecret.secret,
          {
            expiresIn: 60 * 60,
          }
        );
        const token = jwt.sign(
          { id: user.id, email: user.email },
          jwtSecret.secret,
          {
            expiresIn: 10,
          }
        );
        res.status(200).send({
          auth: true,
          token,
          message: "user found & logged in",
          refreshToken,
        });
        await redisClient.setAsync(user.id, refreshToken);
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
        res.status(200).send({ message: "user created", id: user.id });
      });
    }
  })(req, res, next);
});
const { verifyToken } = require("../../middlewares");
router.patch("/update", verifyToken(), (req, res, next) => {
  passport.authenticate("jwt", async (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else {
      console.log("use r is");
      console.log(user);
      const userStored = await User.findOne({
        where: {
          id: user.id,
        },
      });
      let name = req.body.name;
      let dob = req.body.dob;
      let update = {};
      if (name) {
        update = { name };
      }
      if (dob) {
        update.dob = dob;
      }
      const updatedUser = await userStored.update(update).catch(errHandler);

      console.log(updatedUser);
      res.status(200).send(user);
    }
  })(req, res, next);
});

module.exports = router;
