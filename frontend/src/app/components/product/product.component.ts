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
  searchQuery: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;
  sortBy: string = 'name';
  sortOrder: string = 'asc';
  isLoading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load products with pagination and sorting
  loadProducts(): void {
    this.isLoading = true;
    this.productService.getPaginatedProducts(this.currentPage, this.pageSize, this.sortBy, this.sortOrder)
      .subscribe(data => {
        this.products = data.content;
        this.totalPages = data.totalPages;
        this.isLoading = false;
      }, error => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      });
  }

  // Filter products by category
  filterByCategory(): void {
    this.isLoading = true;
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(data => {
        this.products = data;
        this.isLoading = false;
      });
    } else {
      this.loadProducts(); // Reload all products if no category is selected
    }
  }

  // Search for products by query
  searchProducts(): void {
    this.isLoading = true;
    if (this.searchQuery) {
      this.productService.searchProducts(this.searchQuery).subscribe(data => {
        this.products = data;
        this.isLoading = false;
      });
    } else {
      this.loadProducts(); // Reload all products if search query is empty
    }
  }

  // Change sorting order
  changeSorting(sortOption: string): void {
    this.sortBy = sortOption.split(':')[0].trim().toLowerCase();
    this.sortOrder = sortOption.split(':')[1].trim().toLowerCase();
    this.loadProducts();
  }

  // Pagination: Next Page
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  // Pagination: Previous Page
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }
}
