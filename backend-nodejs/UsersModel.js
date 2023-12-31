"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class User extends sequelize_1.Model {
}
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    last_login: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'users',
    sequelize: sequelize_2.default,
    //hooks: {
    // beforeCreate: async (user: User) => {
    //   const salt = await bcrypt.genSalt(10);
    //  user.password = await bcrypt.hash(user.password, salt);
    //  }
    // }
});
exports.default = User;
