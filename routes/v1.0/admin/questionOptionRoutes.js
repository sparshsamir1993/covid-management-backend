var router = require("express").Router();
var Question = require("../../../models/Question");
var QAnswerOptions = require("../../../models/QAnswerOptions");

const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

router.get("/", async (req, res) => {
  const check = await QAnswerOptions.findAll({
    where: {
      questionId: 1,
    },
    include: [
      {
        model: Question,
        required: true,
      },
    ],
  }).catch(errHandler);
  res.status(200).send(check);
});

router.post("/", async (req, res) => {
  let option1 = req.body.option1;
  let option2 = req.body.option2;
  let questionId = req.body.questionId;
  const myquestion = await QAnswerOptions.create({
    option1: option1,
    option2: option2,
    questionId: questionId,
  });
  res.send(option2);
  console.log(myquestion);
});

module.exports = router;
