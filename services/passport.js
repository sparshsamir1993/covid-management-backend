const passport = require("passport");
const keys = require("../keys/keys");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 12;
const JWTStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
opts.secretOrKey = "secret";

const errHandler = (err) => {
  console.log("Error :: " + err);
};

passport.serializeUser((user, done) => {
  done(null, user.ID);
});

passport.deserializeUser((id, done) => {
  User.findOne({ where: { ID: id } }).then((user) => {
    done(null, user);
  });
});

passport.use(
  "jwt",
  new JWTStrategy(opts, (jwt_payload, done) => {
    console.log("here is the token");
    console.log(jwt_payload);
    done(null, {});
  })
);
passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async (req, email, password, done) => {
      console.log(email);
      console.log(password);

      try {
        const user = await User.findOne({
          where: {
            [Op.or]: [
              {
                email,
              },
              { email: req.body.email },
            ],
          },
        });
        if (user != null) {
          console.log("username or email already taken");
          return done(null, false, {
            message: "username or email already taken",
          });
        }
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
          User.create({
            email,
            password: hashedPassword,
            email: req.body.email,
          }).then((user) => {
            console.log("user created");
            return done(null, user);
          });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);
