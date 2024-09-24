import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    // Check if the user is logged in by looking for the JWT token
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
  }

  logout() {
    // Remove the token from localStorage and set isLoggedIn to false
    localStorage.removeItem('jwtToken');
    this.isLoggedIn = false;
    this.router.navigate(['/']); // Redirect to home or login page
  }
}
