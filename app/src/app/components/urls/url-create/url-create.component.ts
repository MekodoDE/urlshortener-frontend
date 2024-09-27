import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-url-create',
  templateUrl: './url-create.component.html',
  styleUrl: './url-create.component.scss'
})
export class UrlCreateComponent {
  urlKey: string = '';
  redirectUrl: string = '';
  isAdmin: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
    this.isAdmin = this.apiService.getUserRole() === 'admin';
  }

  onSubmit() {
    const newUrl: any = {
      redirect_url: this.redirectUrl,
    };

    // Add url_key only if the user is an admin
    if (this.isAdmin) {
      newUrl.url_key = this.urlKey;
    }

    this.apiService.createUrl(newUrl).subscribe(
      () => {
        // Redirect to the URLs list after successful creation
        this.router.navigate(['/url']);
      },
      (error) => {
        console.error('Error creating URL:', error);
      }
    );
  }
}
