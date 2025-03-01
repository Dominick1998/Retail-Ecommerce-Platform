import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:8080/api/wishlist';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get the wishlist for the logged-in user
  getWishlist(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { headers: this.authService.getAuthHeaders() });
  }

  // Add a product to the wishlist
  addToWishlist(productId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/add/${productId}`, {}, { headers: this.authService.getAuthHeaders() });
  }

  // Remove a product from the wishlist
  removeFromWishlist(productId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/remove/${productId}`, {}, { headers: this.authService.getAuthHeaders() });
  }
}
