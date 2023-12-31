import sequelize from './sequelize';
import User from './UsersModel';
import Deck from './DecksModel';
import Flashcard from './FlashCardsModel';
import WorkData from './WorkModel';
import Tag from './TagsModel';
import FlashcardTag from './FlashCardsTagsModel';

Flashcard.belongsToMany(Tag, { through: FlashcardTag, foreignKey: 'flashcardId' });
Tag.belongsToMany(Flashcard, { through: FlashcardTag, foreignKey: 'tagId' });

User.hasMany(Deck, { foreignKey: 'user_id' });
Deck.belongsTo(User, { foreignKey: 'user_id' });

Deck.hasMany(Flashcard, { foreignKey: 'deck_id' });
Flashcard.belongsTo(Deck, { foreignKey: 'deck_id' });

User.hasMany(WorkData, { foreignKey: 'user_id' });
WorkData.belongsTo(User, { foreignKey: 'user_id' });

Flashcard.hasMany(WorkData, { foreignKey: 'card_id' });
WorkData.belongsTo(Flashcard, { foreignKey: 'card_id' });

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });

        const user = await User.create({
            username: 'john_doe',
            email: 'john@example.com',
            password: 'hashed_password',
            last_login: new Date()
        });

        const deck = await Deck.create({
            user_id: user.user_id,
            name: 'Sample Deck',
            description: 'This is a sample deck.',
        });

        const flashcard = await Flashcard.create({
            deck_id: deck.deck_id,
            front_content: 'Front of the card',
            back_content: 'Back of the card',
        });

        const workdata = await WorkData.create({
            user_id: user.user_id,
            card_id: flashcard.card_id,
            last_reviewed: new Date(),
            next_review_due: new Date(),
            repetition_number: 1,
            easiness_factor: 2.5,
            interval: 1
        });

        const tags = ['Seen', 'Not Seen', 'Too hard', 'Too Easy'];
        for (const tagName of tags) {
            await Tag.create({ name: tagName });
        }

        console.log('Database synchronized and sample data inserted.');
    } catch (error) {
        console.error('Failed to synchronize database:', error);
    }
}

syncDatabase();