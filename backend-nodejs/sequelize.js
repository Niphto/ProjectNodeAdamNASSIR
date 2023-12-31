"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = 'CardLearning';
const username = 'CardLearningUser';
const password = 'abc';
const host = 'localhost';
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    logging: false,
});
exports.default = sequelize;
