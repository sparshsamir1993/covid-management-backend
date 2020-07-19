"use strict";
const Sequelize = require("sequelize");
module.exports = sequelize.define("HospitalAdmins", {
  userId: Sequelize.INTEGER,
  hospitalId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
