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
const TagsModel_1 = __importDefault(require("./TagsModel"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = yield TagsModel_1.default.create(Object.assign({}, req.body));
    res.status(201).json(tag);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = yield TagsModel_1.default.findAll();
    res.json(tags);
}));
router.put('/:tag_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield TagsModel_1.default.update(Object.assign({}, req.body), { where: { tag_id: req.params.tag_id } });
    if (updated[0] > 0) {
        const updatedTag = yield TagsModel_1.default.findByPk(req.params.tag_id);
        res.json(updatedTag);
    }
    else {
        res.status(404).json({ message: 'Tag not found' });
    }
}));
router.delete('/:tag_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield TagsModel_1.default.destroy({ where: { tag_id: req.params.tag_id } });
    if (deleted) {
        res.status(204).send();
    }
    else {
        res.status(404).json({ message: 'Tag not found' });
    }
}));
exports.default = router;
