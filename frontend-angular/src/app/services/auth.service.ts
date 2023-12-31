import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserId = new BehaviorSubject<number | null>(null); // To store the user ID

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getCurrentUserId() {
    return this.currentUserId.asObservable();
  }

  constructor() { }

  login(user_id: number) {
    this.loggedIn.next(true);
    this.currentUserId.next(user_id);
  }

  logout() {
    this.loggedIn.next(false);
    this.currentUserId.next(null);
  }
}
