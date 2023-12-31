import { BehaviorSubject } from 'rxjs';

export class SharedService {
  private showReviewSectionSource = new BehaviorSubject<boolean>(false);
  showReviewSection$ = this.showReviewSectionSource.asObservable();

  setShowReviewSection(show: boolean) {
    this.showReviewSectionSource.next(show);
  }
  private selectedDeckIdSource = new BehaviorSubject<number | null>(null);
  selectedDeckId$ = this.selectedDeckIdSource.asObservable();

  setSelectedDeckId(deckId: number | null) {
    this.selectedDeckIdSource.next(deckId);
  }
}
