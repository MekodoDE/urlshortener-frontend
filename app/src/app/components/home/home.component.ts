import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  appTitle = '';

  // Inject ApiService into the component's constructor
  constructor(private apiService: ApiService) {}

  // Use ngOnInit lifecycle hook to call methods from the service
  ngOnInit() {
    // Load the config first to ensure the appTitle is available
    this.apiService.loadConfig().then(() => {
      // Call the appTitle method after the config is loaded
      this.appTitle = this.apiService.appTitle();
    });
  }
}
