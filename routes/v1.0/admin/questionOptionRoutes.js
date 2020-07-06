const router = require("express").Router();
const Question = require("../../../models/Question");
const QAnswerOptions = require("../../../models/QAnswerOptions");
Question.hasMany(QAnswerOptions, {
  as: "qAnswerOptions",
});

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
    { where: { id: questionId } }
  ).catch(errHandler);
  // console.log(myOption);DELETE
  res.status(200).send(myOption);
});

router.delete("/:questionId", async (req, res) => {
  let questionid = req.params.questionId;
  const requestId = await QAnswerOptions.destroy({
    where: { id: questionid },
  }).catch(errHandler);
  console.log(requestId);
  if (requestId < 1) {
    res.sendStatus(403);
  } else {
    res.sendStatus(200).send(requestId);
  }
});

module.exports = router;
