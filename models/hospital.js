"use strict";
const Sequelize = require("sequelize");
module.exports = sequelize.define("Hospitals", {
  name: Sequelize.STRING,
  contact: Sequelize.STRING,
  lat: Sequelize.DECIMAL(8, 6),
  lng: Sequelize.DECIMAL(9, 6),
  detailedAddress: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
