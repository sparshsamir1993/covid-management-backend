const router = require("express").Router();
const Question = require("../../../models/Question");
const QAnswerOptions = require("../../../models/QAnswerOptions");
Question.hasMany(QAnswerOptions, {
  as: "qAnswerOptions",
  foreignKey: "questionId",
});
QAnswerOptions.belongsTo(Question, {
  as: "question",
  foreignKey: "questionId",
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
  let option1 = req.body.option1;
  let option2 = req.body.option2;
  let questionId = req.body.questionId;
  const myquestion = await QAnswerOptions.create({
    option1: option1,
    option2: option2,
    questionId: questionId,
  });
  res.status.send(myquestion);
  console.log(myquestion);
});

module.exports = router;
