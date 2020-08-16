var sequelizeMock = require('sequelize-mock');
var dbMock = new sequelizeMock();
var QAnswerOptionsMock = require('../__mocks__/qansweroption_mock');


var QuestionMock = dbMock.define('Question', {

    questionid: 1,
    question: "Do you have fever?",
    createdAt: new Date(),
    updatedAt: new Date(),
    correctOptionId: 1
});
//QuestionMock.hasMany(QAnswerOptionsMock.QAnswerMock);




let getQuestiondata = () => {
    return QuestionMock.findOne({
        where: { id: 2 },

    }).then((question) => {
        return question
    })
}

module.exports.getQuestiondata = getQuestiondata;
module.exports.QuestionMock = QuestionMock;
module.exports.dbMock = dbMock;