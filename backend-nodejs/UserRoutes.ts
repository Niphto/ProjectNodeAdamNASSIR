import express from 'express';
import User from './UsersModel';
import Deck from './DecksModel';
//import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        //console.log(req.body.password);
        //const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            created_at: new Date(),
            last_login: new Date()
        });

        res.status(201).json({ message: "User created successfully", userId: user.user_id });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
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
    } catch (error) {
        console.error('Login error:', error);
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && req.body.password==user.password) {
            const userDecks = await Deck.findAll({ where: { user_id: user.user_id } });
            res.json({ message: "Logged in successfully", decks: userDecks });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.get('/:user_id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.user_id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.put('/:user_id', async (req, res) => {
    try {
        const updated = await User.update({ ...req.body }, { where: { user_id: req.params.user_id } });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.user_id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Authenticated successfully", user_id: user.user_id });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

export default router;