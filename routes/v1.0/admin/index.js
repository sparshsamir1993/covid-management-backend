var router = require("express").Router();
router.use("/question", require("./questionRoutes"));
router.use("/questionOption", require("./questionOptionRoutes"));
router.use("/userResponse", require("./userQuestionResponses"));
router.use("/user", require("./userRoutes"));
module.exports = router;
