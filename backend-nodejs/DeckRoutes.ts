import express from 'express';
import Deck from './DecksModel';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const deck = await Deck.create({ ...req.body, user_id: req.body.user_id });
        res.status(201).json(deck);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const condition = user_id ? { where: { user_id: user_id } } : undefined;
        const decks = await Deck.findAll(condition);
        res.json(decks);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});
router.put('/:deck_id', async (req, res) => {
    try {
        const updated = await Deck.update({ ...req.body }, { where: { deck_id: req.params.deck_id } });
        if (updated) {
            const updatedDeck = await Deck.findByPk(req.params.deck_id);
            res.status(200).json(updatedDeck);
        } else {
            res.status(404).json({ message: 'Deck not found' });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:deck_id', async (req, res) => {
    try {
        const deleted = await Deck.destroy({ where: { deck_id: req.params.deck_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Deck not found' });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

export default router;