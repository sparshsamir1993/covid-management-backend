var sequelizeMock = require("sequelize-mock");
var dbMock = new sequelizeMock();

var QAnswerMock = dbMock.define("QAnswerOptions", [
  {
    optionContent: "Yes",
    questionId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    optionContent: "No",
    questionId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

getQuestionOptions = (questionId) => {
  const questionOptions = QAnswerMock.findOne({
    where: { questionid: questionId },
  }).catch((error) => {
    console.log(error);
  });

  return questionOptions;
};

module.exports.getQuestionOptions = getQuestionOptions;
module.exports.dbMock = dbMock;
