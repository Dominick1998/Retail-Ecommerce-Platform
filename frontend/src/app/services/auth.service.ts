import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  storeUserData(token: string, roles: string[]): void {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRoles(): string[] {
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUserRoles().includes('ADMIN');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
  }
}
