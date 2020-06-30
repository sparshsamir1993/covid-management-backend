const jwt = require("jsonwebtoken");
const config = require("../config/jwtConfig");
const redisClient = require("../services/redis-client");
const CONSTANTS = require("../constants");
module.exports = () => {
  return async (req, res, next) => {
    const auth = req.headers[CONSTANTS.auth.AUTH_TOKEN_HEADER].split(" ");

    if (auth.length > 1) {
      const token = auth[1];

      try {
        jwt.verify(token, config.secret);
        next();
      } catch (err) {
        console.log("\n\n\n\n EXPIRED !!! \n\n\n");

        if (err.name === "TokenExpiredError") {
          const refreshToken = req.headers[CONSTANTS.auth.REFRESH_TOKEN_HEADER];

          console.log("reresh token is --- " + refreshToken);

          try {
            const decodedRT = jwt.verify(refreshToken, config.secret);

            const { id, email } = decodedRT;
            const redisRT = await redisClient.getAsync(id);

            if (redisRT === refreshToken) {
              const newToken = jwt.sign({ id, email }, config.secret, {
                expiresIn: CONSTANTS.auth.JWT_EXPIRY,
              });
              const refreshToken = jwt.sign({ id, email }, config.secret, {
                expiresIn: CONSTANTS.auth.REFRESH_EXPIRY,
              });
              await redisClient.setAsync(id, refreshToken);
              res.setHeader("token", `JWT ${newToken}`);
              res.setHeader(
                CONSTANTS.auth.REFRESH_TOKEN_HEADER,
                `${refreshToken}`
              );
              req.headers[CONSTANTS.auth.AUTH_TOKEN_HEADER] = `JWT ${newToken}`;
              req.headers[
                CONSTANTS.auth.REFRESH_TOKEN_HEADER
              ] = `${refreshToken}`;
              next();
            } else {
              res.status(500).send("Refresh token Invalid.");
            }
          } catch (err) {
            console.log(err);
            console.log("refrshh too gone");
            res.status(500).send("Refresh token Invalid.");
          }
        } else {
          console.log(err);
        }
      }
    }
  };
};
