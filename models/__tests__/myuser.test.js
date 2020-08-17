var myuser = require("../__mocks__/user_mock");
var sequelizeMock = require("sequelize-mock");
var dbMock = new sequelizeMock();

var UserMock = dbMock.define("User", {
  // name: "shreyash",
  // email: "smac123@gmail.com",
  // password: "sh123",
  // createdAt: new Date(),
  // updatedAt: new Date(),
});

describe("sequelize mock test", () => {
  test("should return email", async (done) => {
    await myuser
      .getUserEmail(2)
      .then((email) => {
        // console.log(email);
        expect(email).toMatch("smacs123@gmail.com");
        done();
      })
      .catch(done());
  });
});
