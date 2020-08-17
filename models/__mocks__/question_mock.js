var sequelizeMock = require('sequelize-mock');
var dbMock = new sequelizeMock();


var QuestionMock = dbMock.define('Question', {

    questionid: 1,
    question: "Do you have fever?",
    createdAt: new Date(),
    updatedAt: new Date(),
    correctOptionId: 1
});

var QAnswerMock = dbMock.define('QAnswerOptions', {

    optionContent: "Yes",
    questionid: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
},
    {
        optionContent: "No",
        questionid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
);


QuestionMock.belongsTo(QAnswerMock);



let getQuestiondata = (id) => {
    return QuestionMock.findOne({
        where: { questionid: id },

    }).then(data => {
        console.log(data.get("QAnswerMock"));
    }).catch((error) => {
        console.log(error);

    })

    console.log(question.getQAnswerMock());
    // return question.get("question");
}

module.exports.getQuestiondata = getQuestiondata;
module.exports.QuestionMock = QuestionMock;
module.exports.dbMock = dbMock;