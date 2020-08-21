"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("QAnswerOptions", "questionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Questions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("QAnswerOptions", "questionId");
  },
};
