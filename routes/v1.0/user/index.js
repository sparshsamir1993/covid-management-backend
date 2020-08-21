var router = require("express").Router();
router.use(require("./userRoutes"));
router.use("/question", require("./questionRoutes"));
router.use("/questionResponse", require("./userAnswerRoutes"));
router.use("/hospital", require("./hospitalRoutes"));
router.use("/appointment", require("./appointmentRoutes"));

module.exports = router;
