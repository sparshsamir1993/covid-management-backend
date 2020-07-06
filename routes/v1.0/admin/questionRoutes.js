var router = require("express").Router();
var Question = require("../../../models/Question");
var QAnswerOptions = require("../../../models/QAnswerOptions");
const verifyToken = require("../../../middlewares/verifyToken");

const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

Question.hasMany(QAnswerOptions, {
  as: "qAnswerOptions",
});

router.get("/", verifyToken(), async (req, res) => {
  const questions = await Question.findAll().catch(errHandler);
  res.status(200).send(questions);
});

router.get("/options", verifyToken(), async (req, res) => {
  let myquestion = req.params.id;
  const myoptions = await Question.findAll({
    //  where: { id: myquestion },
    include: [
      {
        model: QAnswerOptions,
        as: "qAnswerOptions",
        // required: true,
      },
    ],
  });
  console.log(myoptions);
  res.status(200).send(myoptions);
});

router.post("/", verifyToken(), async (req, res) => {
  let text = req.body.question;
  const myquestion = await Question.create({ question: text });
  res.status(200).send(myquestion);
});

router.get("/:id", verifyToken(), async (req, res) => {
  let questionid = req.params.id;
  const myquestion = await Question.findAll({
    where: { id: questionid },
  }).catch(errHandler);
  if (myquestion.length < 1) {
    res.sendStatus(404);
  } else {
    res.status(200).send(myquestion);
  }
});

router.patch("/", verifyToken(), async (req, res) => {
  let questionid = req.body.id;
  const myquestion = await Question.update(
    { question: req.body.question },
    { where: { id: questionid } }
  ).catch(errHandler);
  res.status(200).send(myquestion);
});

router.delete("/:id", verifyToken(), async (req, res) => {
  let questionid = req.params.id;
  const requestId = await Question.destroy({
    where: {
      id: questionid,
    },
  }).catch(errHandler);
  console.log(requestId);
  if (requestId < 1) {
    res.sendStatus(404);
  } else {
    res.sendStatus(200).send(requestId);
  }
});

module.exports = router;
