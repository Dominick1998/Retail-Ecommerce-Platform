import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products = [];
  categories: string[] = ['Electronics', 'Books', 'Clothing', 'Home']; // Example categories
  selectedCategory: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

 currentPage: number = 0;
pageSize: number = 10;

loadProducts() {
  this.productService.getPaginatedProducts(this.currentPage, this.pageSize).subscribe(data => {
    this.products = data.content;
  });
}

nextPage() {
  this.currentPage++;
  this.loadProducts();
}

previousPage() {
  this.currentPage--;
  this.loadProducts();
}

  filterByCategory() {
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(data => {
        this.products = data;
      });
    } else {
      this.loadProducts(); // Load all products if no category is selected
    }
  }
}
