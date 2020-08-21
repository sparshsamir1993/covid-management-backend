"use strict";
const Sequelize = require("sequelize");
const UserQuestionAnswer = sequelize.define("UserQuestionAnswer", {
    userId: Sequelize.INTEGER,
    optionId: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    isOptionCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
},
    {
        freezeTableName: true
    }
);
module.exports = UserQuestionAnswer;