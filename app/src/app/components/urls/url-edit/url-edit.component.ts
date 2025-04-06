import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';

@Component({
  standalone: false,
  selector: 'app-url-edit',
  templateUrl: './url-edit.component.html',
  styleUrl: './url-edit.component.scss'
})
export class UrlEditComponent implements OnInit {
  currentUrlKey: string = '';
  urlKey: string = '';
  redirectUrl: string = '';
  isActive: boolean = true;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.isAdmin = this.apiService.getUserRole() === 'admin';
  }

  ngOnInit(): void {
    // Get URL key from route parameters
    this.route.params.subscribe(params => {
      const urlKey = params['urlKey'];
      if (urlKey) {
        this.currentUrlKey = urlKey;
        this.apiService.getUrl(urlKey).subscribe(
          (url: any) => {
            this.urlKey = url.url_key;
            this.redirectUrl = url.redirect_url;
            this.isActive = url.is_active;
          },
          error => {
            console.error('Error fetching URL:', error);
          }
        );
      }
    });
  }

  onSubmit(): void {
    const updatedUrl = {
      url_key: this.urlKey,
      redirect_url: this.redirectUrl,
      is_active: this.isActive
    };

    // Call the update API
    this.apiService.updateUrl(this.currentUrlKey, updatedUrl).subscribe(
      () => {
        // Redirect to the URLs list after successful update
        this.router.navigate(['/url']);
      },
      (error) => {
        console.error('Error updating URL:', error);
      }
    );
  }
}
