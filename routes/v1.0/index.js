var router = require("express").Router();
router.use("/user", require("./user"));
router.use("/admin", require("./admin"));
router.use("/hospital", require("./hospitalAdmin"));
module.exports = router;
