import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { DeckService } from '../../services/deck.service';
import { AuthService } from '../../services/auth.service';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class FlashcardComponent implements OnInit {
    flashcards: any[] = [];
    newFlashcard = { front_content: '', back_content: '' };
    selectedDeckId?: number;
    selectedFlashcardId?: number;
    decks: any[] = [];
    user_id: number | null = null;
    tags: any[] = [];
    selectedTagName: string = '';

    constructor(private flashcardService: FlashcardService,private deckService: DeckService,private authService: AuthService, private tagService: TagsService) {    this.authService.getCurrentUserId().subscribe(user_id => {
        this.user_id = user_id;
        this.loadDecks();
    });}

    ngOnInit(): void {
        this.loadFlashcards();
        this.loadDecks();
        this.loadTags();
    }

    loadDecks(): void {
        if (this.user_id !== null) {
            this.deckService.getDecks(this.user_id).subscribe(decks => {
                this.decks = decks;
            });
        }
    }
    loadFlashcards(): void {
        if (this.selectedDeckId) {
            this.flashcardService.getFlashcards(this.selectedDeckId).subscribe(flashcards => {
                this.flashcards = flashcards;
            });
        } else {
            this.flashcards = [];
        }
    }

    addFlashcard(): void {
        console.log(this.selectedDeckId);
        if (this.selectedDeckId) {
            this.flashcardService.addFlashcard(this.selectedDeckId, this.newFlashcard).subscribe(() => {
                this.loadFlashcards();
                this.newFlashcard = { front_content: '', back_content: '' };
            });
        }
    }

    deleteFlashcard(card_id: number): void {
        this.flashcardService.deleteFlashcard(card_id).subscribe(() => {
            this.loadFlashcards();
        });
    }

    loadTags(): void {
        this.tagService.getTags().subscribe(tags => {
            this.tags = tags;
        });
    }

    handleTagging(flashcardId: number, tagName: string, action: 'add' | 'remove'): void {
        const tag = this.tags.find(t => t.name === tagName);
        if (tag) {
            if (action === 'add') {
                this.flashcardService.addTagToFlashcard(flashcardId, tag.tag_id).subscribe(() => {
                    this.loadFlashcards();
                    this.loadTags();
                });
            } else if (action === 'remove') {
                this.flashcardService.removeTagFromFlashcard(flashcardId, tag.tag_id).subscribe(() => {
                    this.loadFlashcards();
                    this.loadTags();
                });
            }
        }
    }
}
