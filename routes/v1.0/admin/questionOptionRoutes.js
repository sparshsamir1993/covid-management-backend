const router = require("express").Router();
const Question = require("../../../models/Question");
const QAnswerOptions = require("../../../models/QAnswerOptions");
const verifyToken = require("../../../middlewares/verifyToken");

QAnswerOptions.belongsTo(Question, {
  as: "question",
});

const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

const errHnaldeWResp = (err, res) => {
  console.log("\n\n  *****  Error  **** :: " + err);
  res.sendStatus(500);
};

router.get("/:questionId", verifyToken(), async (req, res) => {
  const check = await QAnswerOptions.findAll({
    where: {
      questionId: req.params.questionId,
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

router.post("/", verifyToken(), async (req, res) => {
  let optionContent = req.body.optionContent;
  let questionId = req.body.questionId;
  let isCorrectOption = req.body.isCorrectOption;
  const createdOption = await QAnswerOptions.create({
    optionContent,
    questionId,
  }).catch(errHandler);
  if (isCorrectOption) {
    await Question.update(
      { correctOptionId: createdOption.id },
      { where: { id: questionId } }
    ).catch((err) => errHnaldeWResp(err, res));
  }

  res.status(200).send(createdOption);
  console.log(createdOption);
});

router.patch("/:optionId", verifyToken(), async (req, res) => {
  let optionContent = req.body.optionContent;
  let optionId = req.params.optionId;
  let questionId = req.body.questionId;
  let isCorrectOption = req.body.isCorrectOption;
  const myOption = await QAnswerOptions.update(
    { optionContent },
    { where: { id: optionId } }
  ).catch(errHandler);
  if (isCorrectOption) {
    console.log(myOption.questionId);
    await Question.update(
      { correctOptionId: optionId },
      { where: { id: questionId } }
    ).catch((err) => errHnaldeWResp(err, res));
  }
  res.status(200).send(myOption);
});

router.delete("/:optionId", verifyToken(), async (req, res) => {
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
// Route to add the correct Option in the QAnswerOptions Table

router.patch("/addAnswer/:questionId", verifyToken(), async (req, res) => {
  let questionId = req.params.questionId;
  let correctAnswer = req.body.correctAnswer;
  const myOption = await QAnswerOptions.update(
    { correctAnswer },
    { where: { questionId: questionId } }
  ).catch(errHandler);
  res.status(200).send(myOption);
});
module.exports = router;
