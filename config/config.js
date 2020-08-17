require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: "example",
    database: "covidManagementDB",
    host: "covidManagementDB",
    dialect: "mysql",
    operatorsAliases: false,
  },
  test: {
    username: "root",
    password: "password",
    database: "covidManagementDBTest",
    host: "covidManagementDB",
    dialect: "mysql",
    operatorsAliases: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false,
  },
};
