const router = require("express").Router();
const UserQuestionAnswer = require("../../../models/UserQuestionAnswer");
const QAnswerOptions = require("../../../models/QAnswerOptions");
const { object } = require("../../../services/redis-client");
const Question = require("../../../models/Question");

UserQuestionAnswer.belongsTo(QAnswerOptions, {
    as: "option"
});

const errHandler = (err) => {
    console.log("\n\n  *****  Error  **** :: " + err);
};


router.get("/", async (req, res) => {

    const userAnswers = await UserQuestionAnswer.findAll({

        include: [{
            model: QAnswerOptions,
            as: "option",
            required: true,
            include: [{
                model: Question,
                as: "question",
                required: true
            }],

        },],
    }).catch(errHandler);
    res.status(200).send(userAnswers);
    console.log(userAnswers);

});



/*router.get("/getCount", async (req, res) => {
    const userId = req.body.userId;
    const count = await UserQuestionAnswer.count({
        where: {
            userId: userId,
            isOptionCorrect: 1
        }
    }).catch(errHandler);
    console.log(count);
    let responseString = { "result": "Positive" }
    if (count >= 2) {
        res.status(200).send(responseString);
    }
    //res.sendStatus(200);

});
*/

router.post("/", async (req, res) => {

    const userAnswers = await UserQuestionAnswer.findAll({
        where: { userId: req.body.userId },
        include: [{
            model: QAnswerOptions,
            as: "option",
            required: true,
            include: [{
                model: Question,
                as: "question",
                required: true
            }],

        },],
    }).catch(errHandler);
    res.status(200).send(userAnswers);
    console.log(userAnswers);
});


router.post("/addResponse", async (req, res) => {

    const userAnswers = req.body.userAnswers;
    const userId = req.body.userId;
    //console.log(req.body);
    //fetch questions..
    const myQuestions = await Question.findAll().catch(errHandler);
    const userSelectedOptionsId = [];

    /* for (x in userAnswers) {
         userSelectedOptionsId.push(userAnswers[x]);
     }*/
    const alldata = await UserQuestionAnswer.findAll({ where: { userId: userId }, attributes: ['optionId'], }).catch(errHandler);

    console.log("ALLLLLLLLLL\n\n")
    //  console.log(alldata);
    // const { optionId } = alldata;


    //console.log(userSelectedOptionsId);

    const myUserId = await UserQuestionAnswer.findOne({ where: { userId: userId } })
        .catch(errHandler);

    console.log("MY USER COUNT\n\n\n")
    // console.log(myUserId);

    if (myUserId != null) {
        var counter = 0;


        for (x in userAnswers) {
            const option = userAnswers[x];
            //console.log(x);
            //  const choosedanswer = await UserQuestionAnswer.update({ where: { optionId: userSelectedOptionsId[counter], userId:  } })

            //console.log("HEREEEEEE\n\n\n")
            //console.log(choosedanswer);
            const myUserResponse = await UserQuestionAnswer.update({ where: { optionId: option, userId } },).catch(errHandler);
            let question = myQuestions.filter((question) => question.id == x)[0];
            //  console.log(myQuestions[0].question)
            let { correctOptionId } = question;
            if (correctOptionId === myUserResponse.optionId) {
                await myUserResponse.update({ isOptionCorrect: true }).catch(errHandler);
            }
            counter += 1;
        }
    }
    else {
        ///   [{1:2},{2:3}]
        for (x in userAnswers) {

            const option = userAnswers[x];
            const myUserResponse = await UserQuestionAnswer.create({ userId: userId, optionId: option, isOptionCorrect: false }).catch(errHandler);
            let question = myQuestions.filter((question) => question.id == x)[0];
            //  console.log(myQuestions[0].question)
            let { correctOptionId } = question;
            if (correctOptionId === myUserResponse.optionId) {
                await myUserResponse.update({ isOptionCorrect: true }).catch(errHandler);
            }

            //  console.log("myUserResponse \n\n\n\n")
            //console.log(myUserResponse)
        }
    }

    let responseString = { "result": "Positive" }

    res.status(200).send(responseString)

    // const userId = req.body.userId;
    /*  const count = await UserQuestionAnswer.count({
          where: {
              userId: userId,
              isOptionCorrect: 1
          }
      }).catch(errHandler);
      console.log("HHEEEEEEEEEEEEEEEEEEEEEEEE \n\n\n\n")
      console.log(count);
      let responseString = { "result": "Positive" }
      if (count >= 2) {
          res.status(200).send(responseString);
      }
      else {
          res.status(200).send({ "result": "Negative" });
      }
  
  });*/


});


module.exports = router;