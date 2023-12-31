import express from 'express';
import Flashcard from './FlashCardsModel';
import FlashcardTag from './FlashCardsTagsModel';
import Tag from './TagsModel';

const router = express.Router();


router.post('/deck/:deck_id', async (req, res) => {
    try {
        const deck_id = req.params.deck_id;
        const { front_content, back_content } = req.body;
        const newFlashcard = await Flashcard.create({ deck_id:deck_id,front_content:front_content, back_content:back_content  });
        res.status(201).json(newFlashcard);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});


router.get('/deck/:deck_id', async (req, res) => {
    try {
        const flashcards = await Flashcard.findAll({ where: { deck_id: req.params.deck_id } });
        res.json(flashcards);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.put('/:card_id', async (req, res) => {
    try {
        const updated = await Flashcard.update({ ...req.body }, { where: { card_id: req.params.card_id } });
        if (updated) {
            const updatedFlashcard = await Flashcard.findByPk(req.params.card_id);
            res.status(200).json(updatedFlashcard);
        } else {
            res.status(404).json({ message: 'Flashcard not found' });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:card_id', async (req, res) => {
    try {
        const deleted = await Flashcard.destroy({ where: { card_id: req.params.card_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Flashcard not found' });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.post('/:card_id/tags', async (req, res) => {
    try {
        const { tagId } = req.body;
        console.log(req.body);
        const card_id = req.params.card_id;

        const flashcardTag = await FlashcardTag.create({ flashcardId: card_id, tagId: tagId });
        res.status(201).json(flashcardTag);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:card_id/tags/:tag_id', async (req, res) => {
    try {
        const { card_id, tag_id } = req.params;

        const deleted = await FlashcardTag.destroy({ where: { flashcardId: card_id, tagId: tag_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Tag not found for the specified flashcard' });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.get('/tags/:tag_id', async (req, res) => {
    try {
        const tagId = req.params.tag_id;
        const flashcards = await Flashcard.findAll({
            include: [{
                model: Tag,
                where: { tag_id: tagId },
                through: { attributes: [] }
            }]
        });
        res.json(flashcards);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

export default router;