const router = require("express").Router();
const UserQuestionAnswer = require("../../../models/UserQuestionAnswer");
const QAnswerOptions = require("../../../models/QAnswerOptions");
const { object } = require("../../../services/redis-client");
const Question = require("../../../models/Question");
const verifyToken = require("../../../middlewares/verifyToken");

UserQuestionAnswer.belongsTo(QAnswerOptions, {
  as: "option",
});

const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

//Fetching user submitted data using userId
router.get("/getResponse", verifyToken(), async (req, res) => {
  console.log(req.query.userId);
  console.log(req.originalUrl);
  const userAnswers = await UserQuestionAnswer.findAll({
    where: { userId: req.query.userId },
    include: [
      {
        model: QAnswerOptions,
        as: "option",
        required: true,
        include: [
          {
            model: Question,
            as: "question",
            required: true,
          },
        ],
      },
    ],
  }).catch(errHandler);
  res.status(200).send(userAnswers);
  console.log("userAnswers \n\n\n\n\n is \n");

  //   console.log(userAnswers);
});

router.post("/addResponse", verifyToken(), async (req, res) => {
  const userAnswers = req.body.userAnswers;
  console.log(userAnswers);
  const userId = req.body.userId;
  const myQuestions = await Question.findAll().catch(errHandler);
  await userAnswers.map(async (answerObject) => {
    console.log(answerObject);
    let isCorrectAnswer = false;
    let question = myQuestions.filter(
      (question) => question.id == answerObject.questionId
    )[0];
    if (question) {
      let { correctOptionId } = question;
      if (correctOptionId === answerObject.optionId) {
        isCorrectAnswer = true;
      }
    }
    const myUserResponse = await UserQuestionAnswer.create({
      userId: userId,
      optionId: answerObject.optionId,
      isOptionCorrect: isCorrectAnswer,
    }).catch(errHandler);
  });
  checkForCovid(res);
});

router.patch("/updateResponse", verifyToken(), async (req, res, next) => {
  const userAnswers = req.body.userAnswers;
  const userId = req.body.userId;
  const myQuestions = await Question.findAll().catch(errHandler);
  let correctOptionIds = myQuestions.map(
    (question) => question.correctOptionId
  );
  console.log("userAnswers");
  console.log(userAnswers);
  // await userAnswers.map(async (answerData) => {
  for (let i = 0; i < userAnswers.length; i++) {
    let answerData = userAnswers[i];
    let isAnswerCorrect = false;
    if (correctOptionIds.includes(answerData.optionId)) {
      isAnswerCorrect = true;
    }
    let currentAnswer = await UserQuestionAnswer.findOne({
      where: { id: answerData.id },
    }).catch(errHandler);
    await currentAnswer
      .update({
        optionId: answerData.optionId,
        isOptionCorrect: isAnswerCorrect,
      })
      .catch(errHandler);
    // const myoptions = await QAnswerOptions.findOne({
    //   where: { id: answerData.optionId },
    //   include: [
    //     {
    //       model: Question,
    //       as: "question",
    //       required: true,
    //     },
    //   ],
    // });
    // const { questionId } = myoptions;
    // let question = myQuestions.filter(
    //   (question) => question.id == questionId
    // )[0];
    // let { correctOptionId } = question;
    // const { optionId } = currentAnswer;
    // console.log("optionId");
    // console.log(optionId);
    // console.log("correctOptionId");
    // console.log(correctOptionId);
    // if (correctOptionId === optionId) {
    //   const n = await currentAnswer
    //     .update({ isOptionCorrect: true })
    //     .catch(errHandler);
    //   // console.log("CHanging here");
    //   // console.log(n);
    // }
  }
  checkForCovid(res);
});

async function checkForCovid(res) {
  const count = await UserQuestionAnswer.count({
    where: { isOptionCorrect: true },
  });
  console.log("Number Count \n\n\n");
  console.log(count);
  if (count >= 2) {
    let responseString = { result: "Positive" };
    res.status(200).send(responseString);
  } else {
    let responseString = { result: "Negative" };
    res.status(200).send(responseString);
  }
}

module.exports = router;
