import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:8080/api/wishlist';

  constructor(private http: HttpClient) {}

  getWishlist(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  addToWishlist(userId: string, productId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/add/${productId}`, {});
  }

  removeFromWishlist(userId: string, productId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/remove/${productId}`, {});
  }
}
