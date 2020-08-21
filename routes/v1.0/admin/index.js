var router = require("express").Router();
router.use("/user", require("./userRoutes"));
router.use("/question", require("./questionRoutes"));
router.use("/questionOption", require("./questionOptionRoutes"));
router.use("/userResponse", require("./userQuestionResponses"));
router.use("/user", require("./userRoutes"));
router.use("/hospital", require("./hospitalRoutes"));
router.use("/metrics", require("./metrics"));

module.exports = router;
