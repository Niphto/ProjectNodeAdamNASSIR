import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

class Flashcard extends Model {
    public card_id!: number;
    public deck_id!: number;
    public front_content!: string;
    public back_content!: string;
}

Flashcard.init({
    card_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    deck_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    front_content: {
        type: new DataTypes.TEXT(),
        allowNull: false,
    },
    back_content: {
        type: new DataTypes.TEXT(),
        allowNull: false,
    },
}, {
    tableName: 'flashcards',
    sequelize,
});

export default Flashcard;