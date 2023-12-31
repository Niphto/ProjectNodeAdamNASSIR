"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("./sequelize"));
const UsersModel_1 = __importDefault(require("./UsersModel"));
const DecksModel_1 = __importDefault(require("./DecksModel"));
const FlashCardsModel_1 = __importDefault(require("./FlashCardsModel"));
const WorkModel_1 = __importDefault(require("./WorkModel"));
const TagsModel_1 = __importDefault(require("./TagsModel"));
const FlashCardsTagsModel_1 = __importDefault(require("./FlashCardsTagsModel"));
FlashCardsModel_1.default.belongsToMany(TagsModel_1.default, { through: FlashCardsTagsModel_1.default, foreignKey: 'flashcardId' });
TagsModel_1.default.belongsToMany(FlashCardsModel_1.default, { through: FlashCardsTagsModel_1.default, foreignKey: 'tagId' });
UsersModel_1.default.hasMany(DecksModel_1.default, { foreignKey: 'user_id' });
DecksModel_1.default.belongsTo(UsersModel_1.default, { foreignKey: 'user_id' });
DecksModel_1.default.hasMany(FlashCardsModel_1.default, { foreignKey: 'deck_id' });
FlashCardsModel_1.default.belongsTo(DecksModel_1.default, { foreignKey: 'deck_id' });
UsersModel_1.default.hasMany(WorkModel_1.default, { foreignKey: 'user_id' });
WorkModel_1.default.belongsTo(UsersModel_1.default, { foreignKey: 'user_id' });
FlashCardsModel_1.default.hasMany(WorkModel_1.default, { foreignKey: 'card_id' });
WorkModel_1.default.belongsTo(FlashCardsModel_1.default, { foreignKey: 'card_id' });
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize_1.default.sync({ force: true });
            const user = yield UsersModel_1.default.create({
                username: 'john_doe',
                email: 'john@example.com',
                password: 'hashed_password',
                last_login: new Date()
            });
            const deck = yield DecksModel_1.default.create({
                user_id: user.user_id,
                name: 'Sample Deck',
                description: 'This is a sample deck.',
            });
            const flashcard = yield FlashCardsModel_1.default.create({
                deck_id: deck.deck_id,
                front_content: 'Front of the card',
                back_content: 'Back of the card',
            });
            const workdata = yield WorkModel_1.default.create({
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
                yield TagsModel_1.default.create({ name: tagName });
            }
            console.log('Database synchronized and sample data inserted.');
        }
        catch (error) {
            console.error('Failed to synchronize database:', error);
        }
    });
}
syncDatabase();
