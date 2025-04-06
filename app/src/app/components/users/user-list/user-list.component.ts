import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';

@Component({
  standalone: false,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: any[] = []; // Array to store the list of users

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch all users from the API
  fetchUsers(): void {
    this.apiService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Edit user (navigate to user edit component)
  editUser(userId: string): void {
    this.router.navigate([`/user/edit/${userId}`]);
  }

  // Delete a user
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(userId).subscribe(
        () => {
          // After successful deletion, refetch the user list
          this.fetchUsers();
        },
        (error: any) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
