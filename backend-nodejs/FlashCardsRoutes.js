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
const express_1 = __importDefault(require("express"));
const FlashCardsModel_1 = __importDefault(require("./FlashCardsModel"));
const FlashCardsTagsModel_1 = __importDefault(require("./FlashCardsTagsModel"));
const TagsModel_1 = __importDefault(require("./TagsModel"));
const router = express_1.default.Router();
router.post('/deck/:deck_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deck_id = req.params.deck_id;
        const { front_content, back_content } = req.body;
        const newFlashcard = yield FlashCardsModel_1.default.create({ deck_id: deck_id, front_content: front_content, back_content: back_content });
        res.status(201).json(newFlashcard);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.get('/deck/:deck_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flashcards = yield FlashCardsModel_1.default.findAll({ where: { deck_id: req.params.deck_id } });
        res.json(flashcards);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.put('/:card_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield FlashCardsModel_1.default.update(Object.assign({}, req.body), { where: { card_id: req.params.card_id } });
        if (updated) {
            const updatedFlashcard = yield FlashCardsModel_1.default.findByPk(req.params.card_id);
            res.status(200).json(updatedFlashcard);
        }
        else {
            res.status(404).json({ message: 'Flashcard not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.delete('/:card_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield FlashCardsModel_1.default.destroy({ where: { card_id: req.params.card_id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Flashcard not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.post('/:card_id/tags', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tagId } = req.body;
        console.log(req.body);
        const card_id = req.params.card_id;
        const flashcardTag = yield FlashCardsTagsModel_1.default.create({ flashcardId: card_id, tagId: tagId });
        res.status(201).json(flashcardTag);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.delete('/:card_id/tags/:tag_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { card_id, tag_id } = req.params;
        const deleted = yield FlashCardsTagsModel_1.default.destroy({ where: { flashcardId: card_id, tagId: tag_id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Tag not found for the specified flashcard' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.get('/tags/:tag_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = req.params.tag_id;
        const flashcards = yield FlashCardsModel_1.default.findAll({
            include: [{
                    model: TagsModel_1.default,
                    where: { tag_id: tagId },
                    through: { attributes: [] }
                }]
        });
        res.json(flashcards);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
