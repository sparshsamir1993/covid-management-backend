const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./keys/keys");

require("./db.js");
require("./services/passport");
require("./services/redis-client");

const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5050;
console.log("on port :: " + PORT);
app.listen(PORT);
