import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  reviews: any[] = [];
  newReview = { comment: '', rating: 5, productId: '', userId: 'user123' };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
      this.loadReviews(productId);
      this.newReview.productId = productId; // Associate the new review with the current product
    }
  }

  // Load product details
  loadProduct(productId: string): void {
    this.productService.getProduct(productId).subscribe(data => {
      this.product = data;
    });
  }

  // Load reviews for the product
  loadReviews(productId: string): void {
    this.http.get(`/api/reviews/product/${productId}`).subscribe((data: any) => {
      this.reviews = data;
    });
  }

  // Add a new review for the product
  addReview(): void {
    this.http.post('/api/reviews', this.newReview).subscribe(() => {
      this.newReview.comment = ''; // Clear the comment after submission
      this.newReview.rating = 5; // Reset the rating to default
      this.loadReviews(this.newReview.productId); // Reload reviews
    });
  }
}
