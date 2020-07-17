'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("UserQuestionAnswer",
      "questionId"
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "UserQuestionAnswer",
      "questionId", {
      type: Sequelize.Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    );
  }
};
