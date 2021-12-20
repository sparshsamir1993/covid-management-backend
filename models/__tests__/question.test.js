var questionMock = require("../__mocks__/question_mock");

describe("sequelize mock test for Question", () => {
    test("should return questionData", async (done) => {
        await questionMock.getQuestiondata(1).then((question) => {

            expect(question).toMatch("Do you have fever?");
            done();
        }, 40000).catch(done);

    })


})
