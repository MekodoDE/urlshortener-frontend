import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  response: any;

  constructor(private apiService: ApiService, private router: Router) { }

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

          // Redirect to the URLs list after successful login
          this.router.navigate(['/urls']);
        },
        (error) => {
          console.error('Error logging in:', error);
        }
      );
    }
  }
}
