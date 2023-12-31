"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class Flashcard extends sequelize_1.Model {
}
Flashcard.init({
    card_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    deck_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    front_content: {
        type: new sequelize_1.DataTypes.TEXT(),
        allowNull: false,
    },
    back_content: {
        type: new sequelize_1.DataTypes.TEXT(),
        allowNull: false,
    },
}, {
    tableName: 'flashcards',
    sequelize: sequelize_2.default,
});
exports.default = Flashcard;
