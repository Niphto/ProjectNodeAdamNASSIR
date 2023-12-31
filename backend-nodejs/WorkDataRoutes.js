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
const WorkModel_1 = __importDefault(require("./WorkModel"));
const WorkDataFunc_1 = __importDefault(require("./WorkDataFunc"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRepetitionData = yield WorkModel_1.default.create(Object.assign({}, req.body));
        res.status(201).json(newRepetitionData);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.get('/:card_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repetitionData = yield WorkModel_1.default.findOne({ where: { card_id: req.params.card_id } });
        if (repetitionData) {
            res.json(repetitionData);
        }
        else {
            res.status(404).json({ message: 'Repetition data not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userPerformance } = req.body;
        const repetitionData = yield WorkModel_1.default.findByPk(req.params.id);
        if (repetitionData) {
            WorkDataFunc_1.default.updateRepetitionData(repetitionData, userPerformance);
            res.json({ message: "Repetition data updated successfully" });
        }
        else {
            res.status(404).json({ message: "Repetition data not found" });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield WorkModel_1.default.destroy({ where: { data_id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Repetition data not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
router.post('/updateRepetitionData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { repetitionDataId, userPerformance } = req.body;
        const repetitionData = yield WorkModel_1.default.findByPk(repetitionDataId);
        if (repetitionData) {
            WorkDataFunc_1.default.updateRepetitionData(repetitionData, userPerformance);
            res.json({ message: "Repetition data updated successfully" });
        }
        else {
            res.status(404).json({ message: "Repetition data not found" });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
