import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  analytics: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.http.get('http://localhost:8080/api/analytics').subscribe(data => {
      this.analytics = data;
    });

    products: any[] = [];

ngOnInit(): void {
  this.loadProducts();
}

loadProducts() {
  this.productService.getProducts().subscribe(data => {
    this.products = data;
  });
}

addProduct() {
  const newProduct = { name: 'New Product', price: 0, description: '', category: '' };
  this.productService.addProduct(newProduct).subscribe(() => {
    this.loadProducts();
  });
}

editProduct(product: any) {
  product.name = prompt('Edit Product Name:', product.name) || product.name;
  product.price = parseFloat(prompt('Edit Product Price:', product.price.toString()) || product.price);
  this.productService.updateProduct(product.id, product).subscribe(() => {
    this.loadProducts();
  });
}

deleteProduct(productId: string) {
  this.productService.deleteProduct(productId).subscribe(() => {
    this.loadProducts();
  });
}
  }
