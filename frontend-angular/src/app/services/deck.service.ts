import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl = 'http://localhost:3000/api/decks';

  constructor(private http: HttpClient) {}

  getDecks(user_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?user_id=${user_id}`);
  }

  addDeck(deck: any, user_id: number): Observable<any> {
    const deckWithUser = { ...deck, user_id };
    return this.http.post(this.apiUrl, deckWithUser);
  }

  updateDeck(deck_id: number, deck: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${deck_id}`, deck);
  }

  deleteDeck(deck_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${deck_id}`);
  }
}
