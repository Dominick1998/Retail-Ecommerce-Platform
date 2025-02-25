import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  isLoading = true;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.http.get('/api/users/profile', { headers: this.authService.getAuthHeaders() })
      .subscribe((data: any) => {
        this.user = data;
        this.isLoading = false;
      }, error => {
        console.error('Error loading profile', error);
        this.isLoading = false;
      });
  }

  updateProfile(): void {
    this.http.put('/api/users/profile/update', this.user, { headers: this.authService.getAuthHeaders() })
      .subscribe(response => {
        alert('Profile updated successfully!');
      }, error => {
        console.error('Error updating profile', error);
      });
  }
}
