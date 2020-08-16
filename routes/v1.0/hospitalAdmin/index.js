var router = require("express").Router();

router.use("/user", require("./user"));
router.use("/appointment", require("./appointment"));
router.use("/metrics", require("./metrics"));

module.exports = router;
