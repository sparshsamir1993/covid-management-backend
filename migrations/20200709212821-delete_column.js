'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("QAnswerOptions",
      "correctAnswer"
    );
  },

  down: (queryInterface, Sequelize) => {

  }
};
