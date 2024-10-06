import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service'; 

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  user = {
    username: '',
    email: '',
    role: '',
    password: '' // Optional password field
  };
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.userId = this.route.snapshot.paramMap.get('urlKey') || '';
    console.log(this.userId);

    // Fetch the user data based on the user ID
    this.apiService.getUser(this.userId).subscribe(
      (userData) => {
        this.user.username = userData.username;
        this.user.email = userData.email;
        this.user.role = userData.role;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  // Handle form submission
  onSubmit(): void {
    // Define updatedUser with optional password field
    const updatedUser: { email: string; role: string; password?: string } = {
      email: this.user.email,
      role: this.user.role
    };
  
    // Add the password only if it is not empty
    if (this.user.password) {
      updatedUser.password = this.user.password;
    }
  
    // Call the API service to update the user
    this.apiService.updateUser(this.userId, updatedUser).subscribe(
      (response) => {
        console.log('User updated successfully', response);
        this.router.navigate(['/user']); // Redirect to the user list
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }  
}
