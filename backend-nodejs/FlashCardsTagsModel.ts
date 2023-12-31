import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

class FlashcardTag extends Model {
    public flashcardId!: number;
    public tagId!: number;
}

FlashcardTag.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    flashcardId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'flashcards', key: 'card_id' },
        onDelete: 'CASCADE',
    },
    tagId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'tags', key: 'tag_id' },
        onDelete: 'CASCADE',
    }
}, {
    tableName: 'flashcardTag',
    sequelize,
});

export default FlashcardTag;