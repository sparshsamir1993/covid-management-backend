var sequelizeMock = require('sequelize-mock');
const QuestionMock = require('../__mocks__/question_mock');
var dbMock = new sequelizeMock();

var QAnswerMock = dbMock.define('QAnswerOptions', {

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
    }
);




module.exports.QAnswerMock = QAnswerMock;