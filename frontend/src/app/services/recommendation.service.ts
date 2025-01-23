import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://localhost:8080/api/recommendations';

  constructor(private http: HttpClient) {}

  getRecommendations(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  getRecommendationsByCategory(userId: string, category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/category/${category}`);
  }

  getTrendingProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trending`);
  }
}
