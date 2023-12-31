import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
    public user_id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public last_login!: Date;
}

User.init({
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'users',
    sequelize,
    //hooks: {
       // beforeCreate: async (user: User) => {
         //   const salt = await bcrypt.genSalt(10);
          //  user.password = await bcrypt.hash(user.password, salt);
      //  }
   // }
});

export default User;