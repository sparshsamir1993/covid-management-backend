'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "QAnswerOptions",
      "correctAnswer", {
      type: Sequelize.Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("QAnswerOptions",
      "correctAnswer"
    )
  }
};
