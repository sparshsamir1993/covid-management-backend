"use strict";
const Sequelize = require("sequelize");
module.exports = sequelize.define("Appointments", {
  appointmentDate: Sequelize.DATE,
  appointmentTime: Sequelize.TIME,
  appointmentStatus: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  hospitalId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
