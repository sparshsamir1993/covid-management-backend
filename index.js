const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./keys/keys");
var cors = require("cors");

require("./db.js");
require("./services/passport");
require("./services/redis-client");

const app = express();
app.use(bodyParser.json());

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey],
//   })
// );
const corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5050",
    "*",
    "https://covid-management-web-stage.herokuapp.com/*",
    "https://covid-management-web-stage.herokuapp.com",
  ],
  credentials: true,
  exposedHeaders: [
    "Access-Control-Allow-Origin",
    "Content-Length",
    "token",
    "authorization",
    "Authorization",
    "refresh-token",
  ],
};
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5050;
console.log("on port :: " + PORT);
app.listen(PORT);
