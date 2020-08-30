// const router = require("express").Router();
// const UserQuestionAnswer = require("../../../models/UserQuestionAnswer");
// const QAnswerOptions = require("../../../models/QAnswerOptions");
// const { object } = require("../../../services/redis-client");
// const Question = require("../../../models/Question");
// const verifyToken = require("../../../middlewares/verifyToken");

// UserQuestionAnswer.belongsTo(QAnswerOptions, {
//   as: "option",
// });

// const errHandler = (err) => {
//   console.log("\n\n  *****  Error  **** :: " + err);
// };

// router.get("/", verifyToken(), async (req, res) => {
//   const userAnswers = await UserQuestionAnswer.findAll({
//     include: [
//       {
//         model: QAnswerOptions,
//         as: "option",
//         required: true,
//         include: [
//           {
//             model: Question,
//             as: "question",
//             required: true,
//           },
//         ],
//       },
//     ],
//   }).catch(errHandler);
//   res.status(200).send(userAnswers);
//   console.log(userAnswers);
// });

// //Fetching user submitted data using userId
// router.post("/", verifyToken(), async (req, res) => {
//   const userAnswers = await UserQuestionAnswer.findAll({
//     where: { userId: req.body.userId },
//     include: [
//       {
//         model: QAnswerOptions,
//         as: "option",
//         required: true,
//         include: [
//           {
//             model: Question,
//             as: "question",
//             required: true,
//           },
//         ],
//       },
//     ],
//   }).catch(errHandler);
//   res.status(200).send(userAnswers);
//   console.log(userAnswers);
// });

// router.post("/addResponse", verifyToken(), async (req, res) => {
//   const userAnswers = req.body.userAnswers;
//   const userId = req.body.userId;
//   const myQuestions = await Question.findAll().catch(errHandler);
//   for (x in userAnswers) {
//     const option = userAnswers[x];
//     const myUserResponse = await UserQuestionAnswer.create({
//       userId: userId,
//       optionId: option,
//       isOptionCorrect: false,
//     }).catch(errHandler);
//     let question = myQuestions.filter((question) => question.id == x)[0];
//     let { correctOptionId } = question;
//     if (correctOptionId === myUserResponse.optionId) {
//       await myUserResponse.update({ isOptionCorrect: true }).catch(errHandler);
//     }
//   }
//   checkForCovid(res);
// });

// router.patch("/", verifyToken(), async (req, res, next) => {
//   const userAnswers = req.body.userAnswers;
//   const userId = req.body.userId;
//   const myQuestions = await Question.findAll().catch(errHandler);
//   for (answers in userAnswers) {
//     const primaryId = answers;
//     const useroptionId = userAnswers[answers];
//     console.log(primaryId);
//     const myUserResponse = await UserQuestionAnswer.update(
//       { optionId: useroptionId },
//       { where: { id: primaryId } }
//     ).catch(errHandler);
//     const updateddata = await UserQuestionAnswer.findOne({
//       where: { id: primaryId },
//     }).catch(errHandler);
//     const myoptions = await QAnswerOptions.findOne({
//       where: { id: useroptionId },
//       include: [
//         {
//           model: Question,
//           as: "question",
//           required: true,
//         },
//       ],
//     });

//     const { questionId } = myoptions;
//     let question = myQuestions.filter(
//       (question) => question.id == questionId
//     )[0];
//     let { correctOptionId } = question;
//     const { optionId } = updateddata;
//     console.log(optionId);
//     if (correctOptionId === optionId) {
//       const n = await updateddata
//         .update({ isOptionCorrect: true })
//         .catch(errHandler);
//       console.log("Changing here");
//       console.log(n);
//     }
//   }

//   checkForCovid(res);
// });

// async function checkForCovid(res) {
//   const count = await UserQuestionAnswer.count({
//     where: { isOptionCorrect: 1 },
//   });
//   console.log("Number Count \n\n\n");
//   console.log(count);
//   if (count >= 2) {
//     let responseString = { result: "Positive" };
//     res.status(200).send(responseString);
//   } else {
//     let responseString = { result: "Negative" };
//     res.status(200).send(responseString);
//   }
// }

// module.exports = router;
