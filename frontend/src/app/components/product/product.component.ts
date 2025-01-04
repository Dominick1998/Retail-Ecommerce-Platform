import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products = [];
  categories: string[] = ['Electronics', 'Books', 'Clothing', 'Home'];
  selectedCategory: string = '';
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getPaginatedProducts(this.currentPage, this.pageSize).subscribe(data => {
      this.products = data.content;
    });
  }

  filterByCategory() {
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(data => {
        this.products = data;
      });
    } else {
      this.loadProducts();
    }
  }

  nextPage() {
    this.currentPage++;
    this.loadProducts();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }
}
