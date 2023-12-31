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
const UsersModel_1 = __importDefault(require("./UsersModel"));
const DecksModel_1 = __importDefault(require("./DecksModel"));
//import bcrypt from 'bcrypt';
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.body.password);
        //const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = yield UsersModel_1.default.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            created_at: new Date(),
            last_login: new Date()
        });
        res.status(201).json({ message: "User created successfully", userId: user.user_id });
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UsersModel_1.default.findOne({ where: { email } });
        if (!user) {
            console.log('WTF :', email);
            return res.status(401).json({ message: "Invalid credentials: user not found" });
        }
        const isMatch = password == user.password;
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials: password does not match" });
        }
        // If email and password are correct
        res.json({ message: "Logged in successfully", userId: user.user_id });
    }
    catch (error) {
        console.error('Login error:', error);
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UsersModel_1.default.findOne({ where: { email: req.body.email } });
        if (user && req.body.password == user.password) {
            const userDecks = yield DecksModel_1.default.findAll({ where: { user_id: user.user_id } });
            res.json({ message: "Logged in successfully", decks: userDecks });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.get('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UsersModel_1.default.findByPk(req.params.user_id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.put('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield UsersModel_1.default.update(Object.assign({}, req.body), { where: { user_id: req.params.user_id } });
        if (updated) {
            const updatedUser = yield UsersModel_1.default.findByPk(req.params.user_id);
            res.json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
router.post('/authenticate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UsersModel_1.default.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Authenticated successfully", user_id: user.user_id });
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
