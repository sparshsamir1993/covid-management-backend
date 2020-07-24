"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      appointmentDateTime: { type: Sequelize.DATE, allowNull: false },
      appointmentStatus: { type: Sequelize.STRING, allowNull: false },
      patientId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Appointments");
  },
};
