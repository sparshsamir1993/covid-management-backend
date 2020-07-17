const router = require("express").Router();
const Question = require("../../../models/Question");
const QAnswerOptions = require("../../../models/QAnswerOptions");

QAnswerOptions.belongsTo(Question, {
  as: "question",
});

const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

router.get("/", async (req, res) => {
  const check = await QAnswerOptions.findAll({
    where: {
      questionId: req.body.questionId,
    },
    include: [
      {
        model: Question,
        as: "question",
        required: true,
      },
    ],
  }).catch(errHandler);
  res.status(200).send(check);
});

router.post("/", async (req, res) => {
  let optionContent = req.body.optionContent;
  let questionId = req.body.questionId;
  const myquestion = await QAnswerOptions.create({
    optionContent,
    questionId: questionId,
  }).catch(errHandler);
  res.status(200).send(myquestion);
  console.log(myquestion);
});

router.patch("/:questionId", async (req, res) => {
  let optionContent = req.body.optionContent;
  let questionId = req.params.questionId;
  const myOption = await QAnswerOptions.update(
    { optionContent },
    { where: { questionId: questionId } }
  ).catch(errHandler);
  console.log(myOption);
  res.status(200).send(myOption);
});

// Route to add the correct Option in the QAnswerOptions Table

router.patch("/addAnswer/:questionId", async (req, res) => {
  let questionId = req.params.questionId;
  let correctAnswer = req.body.correctAnswer;
  const myOption = await QAnswerOptions.update(
    { correctAnswer },
    { where: { questionId: questionId } }
  ).catch(errHandler);
  res.status(200).send(myOption);

});

router.delete("/:optionId", async (req, res) => {
  let optionId = req.params.optionId;
  const requestId = await QAnswerOptions.destroy({
    where: { id: optionId },
  }).catch(errHandler);
  console.log(requestId);
  if (requestId < 1) {
    res.sendStatus(403);
  } else {
    res.sendStatus(200).send(requestId);
  }
});

module.exports = router;
