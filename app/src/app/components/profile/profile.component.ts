import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';  // Adjust path to your ApiService
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = {
    id: '',
    username: '',
    email: '',
    password: ''  // This field will be used for entering a new password
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.user.id = this.apiService.getUserId();

    // Fetch the logged-in user's data
    this.apiService.getUser(this.user.id).subscribe(
      (profileData: any) => {
        this.user.username = profileData.username;
        this.user.email = profileData.email;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  // Submit the updated email and password
  onSubmit(): void {
    const updatedData: any = {
      email: this.user.email
    };

    // Only include the password in the update request if the field is not empty
    if (this.user.password) {
      updatedData.password = this.user.password;
    }

    this.apiService.updateUser(this.user.id, updatedData).subscribe(
      (response) => {
        console.log('Profile updated successfully', response);
        // Optionally redirect or show a success message
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
