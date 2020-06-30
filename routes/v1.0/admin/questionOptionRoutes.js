const router = require("express").Router();
const Question = require("../../../models/Question");
const QAnswerOptions = require("../../../models/QAnswerOptions");
Question.hasMany(QAnswerOptions, {
  as: "qAnswerOptions"

});
QAnswerOptions.belongsTo(Question, {
  as: "question"

});

const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

router.get("/", async (req, res) => {
  const check = await QAnswerOptions.findAll({

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
  let option1 = req.body.option1;
  let option2 = req.body.option2;
  let questionId = req.body.questionId;
  const myquestion = await QAnswerOptions.create({
    option1: option1,
    option2: option2,
    questionId: questionId,
  }).catch(errHandler);
  res.status.send(myquestion);
  console.log(myquestion);
});

router.put("/:questionId", async (req, res) => {

  let option1 = req.body.option1;
  let option2 = req.body.option2;
  let questionId = req.params.questionId;
  const myOption = await QAnswerOptions.update(
    { option1: option1 },
    { where: { id: questionId } }
  ).then(QAnswerOptions.update({ option2: option2 }, { where: { id: questionId } }))
    .catch(errHandler);
  // console.log(myOption);
  res.status(200).send(myOption)

});

router.delete("/:questionId", async (req, res) => {
  let questionid = req.params.id;
  const requestId = await QAnswerOptions.destroy({ where: { id: questionid } }).catch(errHandler);
  if (requestId < 1) {
    res.sendStatus(403);
  } else {
    res.sendStatus(200).send(requestId);
  }

});

module.exports = router;
