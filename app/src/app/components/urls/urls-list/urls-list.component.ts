import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';

@Component({
  standalone: false,
  selector: 'app-url',
  templateUrl: './urls-list.component.html',
  styleUrl: './urls-list.component.scss'
})
export class UrlsListComponent {
  urls : any;
  baseUrl = '';
  
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.baseUrl = window.location.origin + '/';

    this.apiService.getUrls().subscribe(
      (response) => {
        console.log(response)
        this.urls = response;
      },
      (error) => {
        console.error('Error fetching URLs:', error);
      }
    );
  }

  // Function to copy URL to clipboard
  copyToClipboard(url: string) {
    const input = document.createElement('textarea');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  editUrl(url: any) {
    this.router.navigate([`/url/${url.url_key}/edit`]);
  }

  deleteUrl(url: any) {
    // Display confirmation pop-up
    const confirmed = confirm('Are you sure you want to delete this URL?');

    // If user confirms, send delete request
    if (confirmed) {
      this.apiService.deleteUrl(url.url_key).subscribe(
        () => {
          // Remove the URL from the list
          this.urls = this.urls.filter((u: any) => u.url_key !== url.url_key);
        },
        (error) => {
          console.error('Error deleting URL:', error);
        }
      );
    }
  }
}
