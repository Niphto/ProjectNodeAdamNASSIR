import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

class Tag extends Model {
    public tag_id!: number;
    public name!: string;
}

Tag.init({
    tag_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: 'tags',
    sequelize,
});

export default Tag;