'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "UserQuestionAnswer",
      "optionId", {
      type: Sequelize.Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("UserQuestionAnswer",
      "optionId"
    );
  }
};
