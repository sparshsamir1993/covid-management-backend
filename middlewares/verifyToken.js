const jwt = require("jsonwebtoken");
const config = require("../config/jwtConfig");
const redisClient = require("../services/redis-client");
module.exports = () => {
  return async (req, res, next) => {
    const auth = req.headers["authorization"].split(" ");
    if (auth.length > 1) {
      const token = auth[1];
      try {
        let decodedToken = jwt.verify(token, config.secret);
        next();
      } catch (err) {
        console.log("\n\n\n\n EXPIRED !!! \n\n\n");
        if (err.name === "TokenExpiredError") {
          const refreshToken = req.headers["refresh-token"];
          try {
            const decodedRT = jwt.verify(refreshToken, config.secret);
            console.log(decodedRT);
            const { id, email } = decodedRT;
            const redisRT = await redisClient.getAsync(id);
            console.log("redis rt is --- " + redisRT);
            if (redisRT === refreshToken) {
              const newToken = jwt.sign({ id, email }, config.secret, {
                expiresIn: 120,
              });
              res.setHeader("authorization", `JWT ${newToken}`);
              req.headers["authorization"] = `JWT ${newToken}`;
              next();
            } else {
              res.status(500).send("Refresh token Invalid.");
            }
          } catch (err) {
            res.status(500).send("Refresh token Invalid.");
          }
        }
      }
    }
  };
};
