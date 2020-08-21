"use strict";
const Sequelize = require("sequelize");
const Question = sequelize.define("Questions", {
  question: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  correctOptionId: {
    type: Sequelize.INTEGER,

  }
});


module.exports = Question;
