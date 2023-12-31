import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

class Deck extends Model {
    public deck_id!: number;
    public user_id!: number;
    public name!: string;
    public description!: string;
}

Deck.init({
    deck_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    description: {
        type: new DataTypes.STRING(256),
        allowNull: true,
    },
}, {
    tableName: 'decks',
    sequelize,
});

export default Deck;