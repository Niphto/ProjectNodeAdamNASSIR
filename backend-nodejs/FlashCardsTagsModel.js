"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class FlashcardTag extends sequelize_1.Model {
}
FlashcardTag.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    flashcardId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: { model: 'flashcards', key: 'card_id' },
        onDelete: 'CASCADE',
    },
    tagId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: { model: 'tags', key: 'tag_id' },
        onDelete: 'CASCADE',
    }
}, {
    tableName: 'flashcardTag',
    sequelize: sequelize_2.default,
});
exports.default = FlashcardTag;
