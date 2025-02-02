import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // Login and store JWT token
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Register a new user
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // Store JWT token and user roles in localStorage
  storeUserData(token: string, roles: string[]): void {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  // Get stored JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get stored user roles
  getUserRoles(): string[] {
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Check if user is an Admin
  isAdmin(): boolean {
    return this.getUserRoles().includes('ADMIN');
  }

  // Logout and remove user data
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
  }

  // Add authentication headers to HTTP requests
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }
}
