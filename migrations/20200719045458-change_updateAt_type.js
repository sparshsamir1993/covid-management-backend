"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Patients", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.changeColumn("HospitalAdmins", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.dropTable("Patients"),
      queryInterface.dropTable("HospitalAdmins"),
    ]);
  },
};
