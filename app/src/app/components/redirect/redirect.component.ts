import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  standalone: false,
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent {
  response: any;
  errorMessage: string = '';
  isDeactivated: boolean = false;

  constructor(private httpService: ApiService, private router: Router) { }

  ngOnInit() {
    this.httpService.getRedirect().subscribe(
      (response) => {
        this.response = response;

        // Handle deactivated link
        if (this.response && !this.response.is_active) {
          this.isDeactivated = true;
          return; // Prevent further checks or redirection
        }

        // Handle valid and active link with a valid redirect URL
        if (this.response && this.response.redirect_url) {
          window.location.href = this.response.redirect_url;
        } else {
          // Handle cases where there's no redirect URL but response exists
          this.errorMessage = 'No redirect URL found.';
        }
      },
      (error) => {
        // Handle cases where URL is not found or other errors occur
        if (error.status === 404) {
          this.errorMessage = 'The URL was not found.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
}
