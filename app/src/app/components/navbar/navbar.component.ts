import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Subscribe to the login status
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.isAdmin = this.authService.isAdmin()
  }

  logout() {
    // Call the AuthService to handle logout
    this.authService.logout();
    this.router.navigate(['/']);  // Redirect to home or login page
  }
}
