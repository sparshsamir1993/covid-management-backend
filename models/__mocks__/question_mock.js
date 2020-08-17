var sequelizeMock = require('sequelize-mock');
var dbMock = new sequelizeMock();


var QuestionMock = dbMock.define('Question', {

    questionid: 1,
    question: "Do you have fever?",
    createdAt: new Date(),
    updatedAt: new Date(),
    correctOptionId: 1
});
let getQuestiondata = (id) => {
    const question = QuestionMock.findOne({
        where: { questionid: id },

    }).catch((error) => {
        console.log(error);

    })
    return question.get("question");


    // return question.get("question");
}

module.exports.getQuestiondata = getQuestiondata;
module.exports.QuestionMock = QuestionMock;
module.exports.dbMock = dbMock;