"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class WorkData extends sequelize_1.Model {
}
WorkData.init({
    data_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    card_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    last_reviewed: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    next_review_due: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    repetition_number: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    easiness_factor: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    interval: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }
}, {
    tableName: 'work_data',
    sequelize: sequelize_2.default,
});
exports.default = WorkData;
