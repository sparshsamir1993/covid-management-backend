var myuser = require("../__mocks__/user_mock");
var sequelizeMock = require("sequelize-mock");
var dbMock = new sequelizeMock();
describe("sequelize mock test", () => {
  test("should return email", async (done) => {
    await myuser
      .getUserEmail(2)
      .then((email) => {
        expect(email).toMatch("smac123@gmail.com");
        done();
      })
      .catch(done());
  });
});
