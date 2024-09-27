import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to track the login state
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // Observable to expose the login state
  loggedIn$ = this.loggedIn.asObservable();

  constructor() {}

  // Check if JWT token exists in localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  // Update the login state when the user logs in
  login() {
    this.loggedIn.next(true);
  }

  // Update the login state when the user logs out
  logout() {
    localStorage.removeItem('jwtToken');
    this.loggedIn.next(false);
  }
}