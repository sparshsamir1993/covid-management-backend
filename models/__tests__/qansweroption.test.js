var questionOptions = require("../__mocks__/qansweroption_mock");

describe("sequelize mock test for Question Options", () => {
  test("should return questionOptionData", async (done) => {
    await questionOptions
      .getQuestionOptions(1)
      .then((options) => {
        console.log("options.get(0)[1].optionContent \n\n");
        console.log(options.get(0)["0"].optionContent);

        expect(options.get(0)["0"].optionContent + "").toMatch("Yes");
        done();
      }, 40000)
      .catch(done);
  });
});
