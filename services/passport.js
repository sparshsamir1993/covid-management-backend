const passport = require("passport");
const keys = require("../keys/keys");
const User = require("../models/Users");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
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
