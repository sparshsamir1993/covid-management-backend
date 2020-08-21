"use strict";
const Sequelize = require("sequelize");
const Options = sequelize.define("QAnswerOptions", {
  optionContent: Sequelize.STRING,
  questionId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,

});
module.exports = Options;
