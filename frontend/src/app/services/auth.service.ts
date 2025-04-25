import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private authStatusListener = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {}

  // Login and store JWT + refresh token
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Register a new user
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // Store both tokens and roles
  storeUserData(accessToken: string, roles: string[], refreshToken?: string): void {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('roles', JSON.stringify(roles));
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    this.authStatusListener.next(true);
  }

  // Get stored JWT access token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get stored refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // Get stored user roles
  getUserRoles(): string[] {
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Observable to monitor login/logout state
  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  // Check if user has admin privileges
  isAdmin(): boolean {
    return this.getUserRoles().includes('ADMIN');
  }

  // Logout: remove all auth-related data
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('refreshToken');
    this.authStatusListener.next(false);
  }

  // Send auth headers with API requests
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  // Initialize auth state (useful on app start)
  initializeAuthState(): void {
    if (this.isAuthenticated()) {
      this.authStatusListener.next(true);
    }
  }

  // Refresh access token using refresh token
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken });
  }
}
