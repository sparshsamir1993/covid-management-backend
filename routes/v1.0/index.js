var router = require("express").Router();
router.use("/user", require("./userRoutes"));
router.use("/user", require("./adminRoutes"));
//router.use("/admin",require("./adminRoutes"));
module.exports = router;
