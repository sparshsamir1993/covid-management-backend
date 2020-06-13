const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./keys/keys");
const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use("/api", require("./routes"));
app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.PORT || 5050;
app.listen(PORT);
