var questionMock = require("../__mocks__/question_mock");

describe("sequelize mock test for Question", () => {
  test("should return questionData", async (done) => {
    await questionMock
      .getQuestiondata()
      .then((question) => {
        // console.log(question)
        // console.log(question.get('correctOptionId'))
        //expect(email).toMatch('smac123@gmail.com');
        done();
      })
      .catch(done);
  });
});
