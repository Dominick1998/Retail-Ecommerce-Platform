import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  userId = JSON.parse(localStorage.getItem('user') || '{}').id;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.http.get(`http://localhost:8080/api/users/${this.userId}`).subscribe(data => {
      this.user = data;
    });
  }

  saveProfile() {
    this.http.put(`http://localhost:8080/api/users/${this.userId}`, this.user).subscribe(() => {
      alert('Profile updated successfully');
    });
  }
}
