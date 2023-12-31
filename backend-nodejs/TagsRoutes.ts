import express from 'express';
import Tag from './TagsModel';

const router = express.Router();

router.post('/', async (req, res) => {
    const tag = await Tag.create({ ...req.body });
    res.status(201).json(tag);
});

router.get('/', async (req, res) => {
    const tags = await Tag.findAll();
    res.json(tags);
});

router.put('/:tag_id', async (req, res) => {
    const updated = await Tag.update({ ...req.body }, { where: { tag_id: req.params.tag_id } });
    if (updated[0] > 0) {
        const updatedTag = await Tag.findByPk(req.params.tag_id);
        res.json(updatedTag);
    } else {
        res.status(404).json({ message: 'Tag not found' });
    }
});

router.delete('/:tag_id', async (req, res) => {
    const deleted = await Tag.destroy({ where: { tag_id: req.params.tag_id } });
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Tag not found' });
    }
});

export default router;