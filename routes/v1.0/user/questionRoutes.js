var router = require("express").Router();
var Question = require("../../../models/Question");
var QAnswerOptions = require("../../../models/QAnswerOptions");
const verifyToken = require("../../../middlewares/verifyToken");


const errHandler = (err) => {
    console.log("\n\n  *****  Error  **** :: " + err);
};




router.get("/options", verifyToken(), async (req, res) => {
    let myquestion = req.params.id;
    const myoptions = await Question.findAll({
        //  where: { id: myquestion },
        include: [
            {
                model: QAnswerOptions,
                as: "qAnswerOptions",
                required: true,
            },
        ],
    }).catch(errHandler);
    console.log(myoptions);
    res.status(200).send(myoptions);
});

module.exports = router;