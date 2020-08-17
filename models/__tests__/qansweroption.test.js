var questionOptions = require("../__mocks__/qansweroption_mock");

describe("sequelize mock test for Question Options", () => {
    test("should return questionOptionData", async (done) => {
        await questionOptions.getQuestionOptions(1).then((options) => {
            console.log(`${options.get(0)}`);

            expect(options.get('optionContent')).toMatch("Yes");
            done();
        }, 40000).catch(done);

    })
})
