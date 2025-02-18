import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  // Fetch all products (without pagination)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`);
  }

  // Fetch paginated products with sorting
  getPaginatedProducts(page: number, size: number, sortBy: string = 'name', sortOrder: string = 'asc'): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }

  // Fetch products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  // Search for products by name
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?query=${query}`);
  }

  // Add a new product (Admin Only)
  addProduct(product: Product, token: string): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.getAuthHeaders(token) });
  }

  // Update an existing product (Admin Only)
  updateProduct(id: string, product: Product, token: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers: this.getAuthHeaders(token) });
  }

  // Delete a product by ID (Admin Only)
  deleteProduct(id: string, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders(token) });
  }

  // Helper method to add authentication headers
  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
