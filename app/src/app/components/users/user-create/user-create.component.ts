import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';

@Component({
  standalone: false,
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  user = {
    username: '',
    email: '',
    password: '',
    role: 'member'
  };

  roles = ['user', 'admin'];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  // Submit the form to create a new user
  onSubmit() {
    this.apiService.createUser(this.user).subscribe(
      (response) => {
        console.log('User created successfully', response);
        // Redirect to the user management page or somewhere else after creation
        this.router.navigate(['/user']);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
