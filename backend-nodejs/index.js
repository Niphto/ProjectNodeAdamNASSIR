"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const DeckRoutes_1 = __importDefault(require("./DeckRoutes"));
const WorkDataRoutes_1 = __importDefault(require("./WorkDataRoutes"));
const FlashCardsRoutes_1 = __importDefault(require("./FlashCardsRoutes"));
const TagsRoutes_1 = __importDefault(require("./TagsRoutes"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/users', UserRoutes_1.default);
app.use('/api/decks', DeckRoutes_1.default);
app.use('/api/work_data', WorkDataRoutes_1.default);
app.use('/api/flashcards', FlashCardsRoutes_1.default);
app.use('/api/tags', TagsRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
