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
  const myquestion = await QAnswerOptions.create({
    optionContent,
    questionId,
  }).catch(errHandler);
  res.status(200).send(myquestion);
  console.log(myquestion);
});

router.patch("/:optionId", verifyToken(), async (req, res) => {
  let optionContent = req.body.optionContent;
  let optionId = req.params.optionId;
  const myOption = await QAnswerOptions.update(
    { optionContent },
    { where: { id: optionId } }
  ).catch(errHandler);
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

module.exports = router;
