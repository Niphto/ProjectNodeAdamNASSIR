import express from 'express';
import WorkData from './WorkModel';
import SpacedRepetitionService from './WorkDataFunc';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newRepetitionData = await WorkData.create({ ...req.body });
        res.status(201).json(newRepetitionData);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.get('/:card_id', async (req, res) => {
    try {
        const repetitionData = await WorkData.findOne({ where: { card_id: req.params.card_id } });
        if (repetitionData) {
            res.json(repetitionData);
        } else {
            res.status(404).json({ message: 'Repetition data not found' });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { userPerformance } = req.body;
        const repetitionData = await WorkData.findByPk(req.params.id);

        if (repetitionData) {
            SpacedRepetitionService.updateRepetitionData(repetitionData, userPerformance);
            res.json({ message: "Repetition data updated successfully" });
        } else {
            res.status(404).json({ message: "Repetition data not found" });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await WorkData.destroy({ where: { data_id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Repetition data not found' });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

export default router;
router.post('/updateRepetitionData', async (req, res) => {
    try {
        const { repetitionDataId, userPerformance } = req.body;
        const repetitionData = await WorkData.findByPk(repetitionDataId);
        if (repetitionData) {
            SpacedRepetitionService.updateRepetitionData(repetitionData, userPerformance);
            res.json({ message: "Repetition data updated successfully" });
        } else {
            res.status(404).json({ message: "Repetition data not found" });
        }
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});