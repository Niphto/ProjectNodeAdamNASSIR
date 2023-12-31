import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

class WorkData extends Model {
    public data_id!: number;
    public user_id!: number;
    public card_id!: number;
    public last_reviewed!: Date;
    public next_review_due!: Date;
    public repetition_number!: number;
    public easiness_factor!: number;
    public interval!: number;
}

WorkData.init({
    data_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    card_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    last_reviewed: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    next_review_due: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    repetition_number: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    easiness_factor: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    interval: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }
}, {
    tableName: 'work_data',
    sequelize,
});

export default WorkData;