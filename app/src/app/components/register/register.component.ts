import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit(form: any) {
    if (form.valid) {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      console.log('Form Submitted!');
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Add your login logic here (e.g., sending credentials to the server)

      this.apiService.createUser(userData).subscribe(
        () => {
          console.log('Registration successful!');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = error;
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
