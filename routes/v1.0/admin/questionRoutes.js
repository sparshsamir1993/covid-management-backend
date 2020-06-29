var router = require("express").Router();
var Question = require("../../../models/Question");
var QAnswerOptions = require("../../../models/QAnswerOptions");

router.get("/", async (req, res) => {
  const questions = await Question.findAll()
    .then((questions) => {
      res.status(200).send(questions);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/", async (req, res) => {
  let text = req.body.question;
  const myquestion = await Question.create({ question: text });
  console.log(text);
  res.send(text);
});

router.get("/:id", async (req, res) => {
  let questionid = req.params.id;
  const myquestion = await Question.findAll({ where: { id: questionid } })
    .then((myquestion) => {
      res.status(200).send(myquestion);
    })
    .catch((error) => {
      res.status(403).send(error);
    });
});

router.put("/:id", async (req, res) => {
  let questionid = req.params.id;
  const myquestion = await Question.update(
    { question: req.body.question },
    { where: { id: questionid } }
  )
    .then((myquestion) => {
      res.status(200).send(myquestion);
    })
    .catch((error) => {
      res.sendStatus(403).send(error);
    });
});

router.delete("/:id", async (req, res) => {
  let questionid = req.params.id;
  const requestId = await Question.destroy({
    where: {
      id: questionid,
    },
  })
    .then((requestCode) => {
      res.sendStatus(200).send(requestCode);
    })
    .catch((error) => {
      res.sendStatus(403).send(error);
    });
});

module.exports = router;
