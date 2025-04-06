import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  response: any;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

  onSubmit(form: any) {
    if (form.valid) {
      const loginData = {
        username: this.username,
        password: this.password,
      }

      this.apiService.login(loginData).subscribe(
        (response: any) => {
          // Extract the access token
          const accessToken = response.access_token;

          // Store the access token in localStorage
          localStorage.setItem('jwtToken', accessToken);

          // Notify the AuthService about login
          this.authService.login();

          // Redirect to the URLs list after successful login
          this.router.navigate(['/url']);
        },
        (error) => {
          console.error('Error logging in:', error);
        }
      );
    }
  }
}
