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
const DecksModel_1 = __importDefault(require("./DecksModel"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deck = yield DecksModel_1.default.create(Object.assign(Object.assign({}, req.body), { user_id: req.body.user_id }));
        res.status(201).json(deck);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.query.user_id;
        const condition = user_id ? { where: { user_id: user_id } } : undefined;
        const decks = yield DecksModel_1.default.findAll(condition);
        res.json(decks);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.put('/:deck_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield DecksModel_1.default.update(Object.assign({}, req.body), { where: { deck_id: req.params.deck_id } });
        if (updated) {
            const updatedDeck = yield DecksModel_1.default.findByPk(req.params.deck_id);
            res.status(200).json(updatedDeck);
        }
        else {
            res.status(404).json({ message: 'Deck not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.delete('/:deck_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield DecksModel_1.default.destroy({ where: { deck_id: req.params.deck_id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Deck not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
