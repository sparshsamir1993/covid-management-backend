var router = require("express").Router();
router.use("/signOn", require("./userRoutes"));
router.use("/question", require("./questionRoutes"));
router.use("/questionResponse", require("./userAnswerRoutes"));


module.exports = router;