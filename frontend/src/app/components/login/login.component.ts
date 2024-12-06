import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:8080/api/users/login', {
      username: this.username,
      password: this.password,
    }).subscribe({
      next: (response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/products']);
      },
      error: () => {
        alert('Invalid credentials');
      }
    });
  }
}
