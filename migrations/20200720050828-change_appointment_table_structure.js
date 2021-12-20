"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Appointments",
          "userId",
          {
            type: Sequelize.DataTypes.INTEGER,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Appointments",
          "hospitalId",
          {
            type: Sequelize.DataTypes.INTEGER,
          },
          { transaction: t }
        ),
        queryInterface.removeColumn("Appointments", "patientId"),
        queryInterface.dropTable("Patients"),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Appointments", "hospitalId", {
          transaction: t,
        }),
        queryInterface.removeColumn("Appointments", "userId", {
          transaction: t,
        }),
      ]);
    });
  },
};
