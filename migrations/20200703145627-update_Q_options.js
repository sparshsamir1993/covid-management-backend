'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("QAnswerOptions", "option1"),
      queryInterface.removeColumn("QAnswerOptions", "option2"),

      queryInterface.addColumn("QAnswerOptions", "options",
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("QAnswerOptions", "options")
  }
};
