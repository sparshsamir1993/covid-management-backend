const jwt = require("jsonwebtoken");
const config = require("../config/jwtConfig");
module.exports = () => {
  return (req, res, next) => {
    const auth = req.headers["authorization"].split(" ");
    if (auth.length > 1) {
      const token = auth[1];
      let decodedToken = jwt.verify(token, config.secret);
      if (new Date(decodedToken.exp * 1000) < new Date()) {
        console.log("expired");
      }
      console.log(decodedToken);
      //   if(decoded)
    }
    // console.log(token.split(" ")[1]);
    // console.log(req.headers);
    //   try {
    //     const decoded = jwt.verify(token, config.secret);
    //     return true;
    //   } catch (err) {
    //     return false;
    //   }
  };
  //   try {
  //     const decoded = jwt.verify(token, config.secret);
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
};
