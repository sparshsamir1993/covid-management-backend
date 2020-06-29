"use strict";
const Sequelize = require("sequelize");
const Options = sequelize.define("QAnswerOptions", {
  option1: Sequelize.STRING,
  option2: Sequelize.STRING,
  questionId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

Options.associate = (models) => {
  Options.hasOne(models.Question);
};

module.exports = Options;
