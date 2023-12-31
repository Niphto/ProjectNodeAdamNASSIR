import { Component, OnInit, Input } from '@angular/core';
import { FlashcardService } from '../../services/flashcard.service';
import { WorkDataService } from '../../services/work-data.service';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class ReviewComponent implements OnInit {
  @Input() deckId: number| null = null;
  flashcards: any[] = [];
  currentFlashcardIndex: number = 0;
  currentFlashcard: any = null;
  userRating: number = 0;
  reviewCompleted: boolean = false;
  userWorkData: any[] = [];

  constructor(
      private flashcardService: FlashcardService,
      private workDataService: WorkDataService
  ) { }

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    if (this.deckId) {
      this.flashcardService.getFlashcards(this.deckId).subscribe(data => {
        this.flashcards = data;
        this.currentFlashcard = this.flashcards[this.currentFlashcardIndex];
      });
    }
  }

  rateFlashcard(rating: number): void {
    this.workDataService.updateRepetitionData(this.currentFlashcard.card_id, rating).subscribe(() => {
      if (this.currentFlashcardIndex < this.flashcards.length - 1) {
        this.currentFlashcardIndex++;
        this.currentFlashcard = this.flashcards[this.currentFlashcardIndex];
      } else {
        this.reviewCompleted = true;
        this.userWorkData = [];
        this.flashcards.forEach(card => {
          this.workDataService.getWorkData(card.card_id).subscribe(data => {
            this.userWorkData.push(data);
          });
        });
      }
    });
  }
}
