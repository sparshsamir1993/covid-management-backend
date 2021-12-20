'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Questions",
      "correctOptionId", {
      type: Sequelize.Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    );
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn("Questions",
      "correctOptionId"
    );
  }
};
