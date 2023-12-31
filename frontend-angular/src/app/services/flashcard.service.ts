import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private apiUrl = 'http://localhost:3000/api/flashcards';

  constructor(private http: HttpClient) {}

  getFlashcards(deck_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/deck/${deck_id}`);
  }

  addFlashcard(deck_id: number, flashcard: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/deck/${deck_id}`, flashcard);
  }

  deleteFlashcard(card_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${card_id}`);
  }

  addTagToFlashcard(card_id: number, tagId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${card_id}/tags`, { tagId });
  }

  removeTagFromFlashcard(card_id: number, tagId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${card_id}/tags/${tagId}`);
  }

}
