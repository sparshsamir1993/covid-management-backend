'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "UserQuestionAnswer",
      "isOptionCorrect", {
      type: Sequelize.Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("UserQuestionAnswer",
      "isOptionCorrect"
    );

  }
};
