var router = require("express").Router();
router.use("/signOn", require("./userRoutes"));
router.use("/question", require("./questionRoutes"));
router.use("/questionResponse", require("./userAnswerRoutes"));
router.use("/hospital", require("./hospitalRoutes"));


module.exports = router;