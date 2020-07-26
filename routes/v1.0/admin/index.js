var router = require("express").Router();
router.use("/user", require("./userRoutes"));
router.use("/question", require("./questionRoutes"));
router.use("/questionOption", require("./questionOptionRoutes"));
router.use("/hospital", require("./hospitalRoutes"));

module.exports = router;
