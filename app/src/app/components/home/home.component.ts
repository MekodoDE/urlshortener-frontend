import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  appTitle = '';

  // Inject ApiService into the component's constructor
  constructor(private apiService: ApiService) {}

  // Use ngOnInit lifecycle hook to call methods from the service
  ngOnInit() {
    this.appTitle = localStorage.getItem("appTitle") || "";
    if (this.appTitle == "") {
      this.apiService.configSubject.subscribe((val: any) => this.appTitle = val.appTitle)  
    }   
  }
}