"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Appointments",
          "appointmentTime",
          {
            type: Sequelize.DataTypes.TIME,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Appointments",
          "appointmentDate",
          {
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.removeColumn("Appointments", "appointmentDateTime"),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Appointments", "appointmentDate", {
          transaction: t,
        }),
        queryInterface.removeColumn("Appointments", "appointmentTime", {
          transaction: t,
        }),
      ]);
    });
  },
};
