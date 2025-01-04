import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  category?: string; // Added category field for consistency
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

  // Fetch paginated products
  getPaginatedProducts(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  // Fetch products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Update an existing product
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Delete a product by ID
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
