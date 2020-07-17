"use strict";
const Sequelize = require("sequelize");
module.exports = sequelize.define("Appointments", {
  appoitmentDateTime: Sequelize.DATE,
  appointmentStatus: Sequelize.STRING,
  patientId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
