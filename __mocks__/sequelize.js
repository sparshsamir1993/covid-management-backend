const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
let hospital = dbMock.define("Hospitals", {
  id: 1,
  name: "GRH",
  createdAt: new Date(),
  updatedAt: new Date(),
  contact: "2345678",
  lat: 9.999,
  lng: 9.999,
  detailedAddress: "dfghjk",
});
console.log(hospital);
let hospitalAdmin = dbMock.define("HospitalAdmins", {
  id: 1,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  hospitalId: 1,
});

jest.mock("../models/user", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  dbMock.define("users", {
    id: 1,
    name: "shreyash",
    email: "smac123@gmail.com",
    password: "sh123",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return dbMock;
});
jest.mock("../models/Question", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  dbMock.define("Questions", {
    id: 1,
    question: "How are you?",
    createdAt: new Date(),
    updatedAt: new Date(),
    correctOptionId: 1,
  });
  return dbMock;
});
jest.mock("../models/QAnswerOptions", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  dbMock.define("QAnswerOptions", {
    id: 1,
    optionContent: "Awesome !!",
    createdAt: new Date(),
    updatedAt: new Date(),
    questionId: 1,
  });
  return dbMock;
});
jest.mock("../models/hospital", () => async () => {
  console.log("samirrr");
});

jest.mock("../models/hospitalAdmin", () => () => {
  //   const SequelizeMock = require("sequelize-mock");
  //   const dbMock = new SequelizeMock();
  //   return dbMock;
});

// hosptA.belongsTo(hosp);
hospitalAdmin.belongsTo(hospital, {
  as: "hospital",
  foreignKey: "hospitalId",
});

module.exports = dbMock;
