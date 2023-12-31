import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DeckComponent } from './components/deck/deck.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { ReviewComponent } from './components/review/review.component';

import { UserService } from './services/user.service';
import { DeckService } from './services/deck.service';
import { FlashcardService } from './services/flashcard.service';
import { AuthService } from './services/auth.service';
import { TagsService } from './services/tags.service';
import { SharedService } from './services/shared-service.service';
import { WorkDataService } from './services/work-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, LoginComponent, RegisterComponent,DeckComponent,
    FlashcardComponent,ReviewComponent],
  providers: [UserService, DeckService, FlashcardService,TagsService,SharedService,WorkDataService]
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  showLogin: boolean = true;
  showRegister: boolean = true;
  showDecks: boolean = false;
  showFlashcards: boolean = false;
  showReviewSection: boolean = false;
  selectedDeckIdForReview: number | null = null;
  title: string| null = null;

  constructor(
      private authService: AuthService,
      private sharedService: SharedService
  ) {}

  ngOnInit() {

    this.authService.isLoggedIn.subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
      this.showLogin = !loggedInStatus;
      this.showRegister = !loggedInStatus;
      this.showDecks = loggedInStatus;
      this.showFlashcards = loggedInStatus;
    });
    this.sharedService.showReviewSection$.subscribe(show => {
      this.showReviewSection = show;
      if (show) {
        this.showDecks = false;
        this.showFlashcards = false;
        this.showRegister = false;
        this.showLogin = false;
      }
    });
  }

  toggleComponent(component: string) {
    this.showLogin = component === 'login' && !this.showLogin;
    this.showRegister = component === 'register' && !this.showRegister;
    this.showDecks = component === 'decks' && !this.showDecks;
    this.showFlashcards = component === 'flashcards' && !this.showFlashcards;
    this.showReviewSection = component === 'review' && !this.showReviewSection;
  }

  logout() {
    this.authService.logout();
  }
}
