var router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const jwtSecret = require("../../../config/jwtConfig");
const { v4: uuid } = require("uuid");
const redisClient = require("../../../services/redis-client");
const Question = require("../../../models/Question");
const HospitalAdmin = require("../../../models/hospitalAdmin");
const Hospital = require("../../../models/hospital");

HospitalAdmin.belongsTo(Hospital, {
  as: "hospital",
  foreignKey: "hospitalId",
});

Hospital.hasMany(HospitalAdmin, {
  as: "hospitalAdmin",
  foreignKey: "hospitalId",
});
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
            expiresIn: REFRESH_EXPIRY,
          }
        );
        const token = jwt.sign(
          { id: user.id, email: user.email },
          jwtSecret.secret,
          {
            expiresIn: JWT_EXPIRY,
          }
        );
        await redisClient.setAsync(user.id, refreshToken);
        res.status(200).send({
          auth: true,
          token,
          message: "user found & logged in",
          refreshToken,
          id: user.id,
          email: user.email,
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
        res.status(200).send({ message: "user created", id: user.id });
      });
    }
  })(req, res, next);
});

const { verifyToken, jwtAuth } = require("../../../middlewares");
const {
  REFRESH_EXPIRY,
  JWT_EXPIRY,
} = require("../../../constants/authConstants");

router.patch("/update", verifyToken(), async (req, res, next) => {
  let user = await jwtAuth(req, res, next);
  if (user) {
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
    let { id, email } = updatedUser;
    // console.log(updatedUser);
    res.status(200).send({ id, email, name: updatedUser.name });
  } else {
    res.status(404).send("Cant find user");
  }
});

router.get("/get", verifyToken(), async (req, res, next) => {
  const user = await jwtAuth(req, res, next);
  if (user) {
    const userStored = await User.findOne({
      where: {
        id: user.id,
      },
      include: [
        {
          model: HospitalAdmin,
          as: "hospitalAdmin",
          include: [
            {
              model: Hospital,
              as: "hospital",
            },
          ],
        },
      ],
    });

    let { id, name, email, role, hospitalAdmin } = userStored;
    res.status(200).send({ id, name, email, role, hospitalAdmin });
  } else {
    res.status(500).send("Error");
  }
});

module.exports = router;
