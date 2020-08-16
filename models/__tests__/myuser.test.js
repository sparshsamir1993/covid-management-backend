var myuser = require("../__mocks__/user_mock");

describe("sequelize mock test", () => {
  test("should return email", async (done) => {
    await myuser
      .getUserEmail(2)
      .then((email) => {
        console.log(email);
        expect(email).toMatch("smacs123@gmail.com");
        done();
      })
      .catch(done);
  });
});
