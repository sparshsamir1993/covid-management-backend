"use strict";
const Sequelize = require("sequelize");
const Question= sequelize.define("Questions", {
  question: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

Question.associate = models => 
{
 
  Question.hasOne(models.QAnswerOptions)

}

module.exports = Question;
  