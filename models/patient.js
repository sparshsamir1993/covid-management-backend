"use strict";
const Sequelize = require("sequelize");
module.exports = sequelize.define("Patients", {
  userId: Sequelize.INTEGER,
  hospitalId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.INTEGER,
});
