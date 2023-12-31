import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeckService } from '../../services/deck.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared-service.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class DeckComponent implements OnInit {
  decks: any[] = [];
  newDeck = { name: '', description: '' };
  user_id: number | null = null;
  editingDeckId: number | null = null;
  tempDeck = { name: '', description: '' };
  showReviewSection: boolean = false;
  selectedDeckIdForReview: number | null = null;

  constructor(
    private deckService: DeckService,
    private authService: AuthService,
    private sharedService: SharedService

  ) {    this.authService.getCurrentUserId().subscribe(user_id => {
      this.user_id = user_id;
  });
  }

    ngOnInit(): void {
        this.loadDecks();
    }

    loadDecks(): void {
        if (this.user_id) {
            this.deckService.getDecks(this.user_id).subscribe(decks => {
                this.decks = decks;
            });
        }
    }

  addDeck(): void {
    if (this.user_id) {
      this.deckService.addDeck(this.newDeck, this.user_id).subscribe(() => {
        this.loadDecks();
        this.newDeck = { name: '', description: '' };
        this.decks.push(this.newDeck);
      });
    } else {
      console.error('User ID is not available. Deck cannot be created.');
    }
  }

    editDeck(deck: any): void {
        this.editingDeckId = deck.deck_id;
        this.tempDeck = { ...deck };
    }

    saveDeck(): void {
        if (this.editingDeckId !== null) {
            this.deckService.updateDeck(this.editingDeckId, this.tempDeck).subscribe(() => {
                const index = this.decks.findIndex(d => d.deck_id === this.editingDeckId);
                if (index !== -1) this.decks[index] = { ...this.tempDeck, deck_id: this.editingDeckId };
                this.editingDeckId = null;
                this.tempDeck = { name: '', description: '' };
            });
        }
    }

    cancelEdit(): void {
        this.editingDeckId = null;
        this.tempDeck = { name: '', description: '' };
    }

    startDeck(deck_id: number): void {
        this.sharedService.setSelectedDeckId(deck_id);
        this.sharedService.setShowReviewSection(true);
    }

  deleteDeck(deck_id: number): void {
    this.deckService.deleteDeck(deck_id).subscribe(() => {
      this.loadDecks();
    });
  }
}
