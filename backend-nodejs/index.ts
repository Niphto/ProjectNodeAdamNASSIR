import userRoutes from './UserRoutes';
import deckRoutes from './DeckRoutes';
import WorkDataRoutes from './WorkDataRoutes';
import FlashcardRoutes from './FlashCardsRoutes';
import tagRoutes from './TagsRoutes';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/work_data', WorkDataRoutes);
app.use('/api/flashcards', FlashcardRoutes);
app.use('/api/tags', tagRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});