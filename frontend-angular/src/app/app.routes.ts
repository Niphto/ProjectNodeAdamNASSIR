import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DeckComponent } from './components/deck/deck.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'decks', component: DeckComponent },
  { path: 'flashcards/:deckId', component: FlashcardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
