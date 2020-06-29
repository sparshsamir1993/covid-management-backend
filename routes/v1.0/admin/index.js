var router = require("express").Router();
router.use("/question", require("./questionRoutes"));
router.use("/questionOption", require("./questionOptionRoutes"));
module.exports = router;
