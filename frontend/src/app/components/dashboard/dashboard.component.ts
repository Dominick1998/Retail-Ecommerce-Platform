import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recommendations: any[] = [];
  trendingProducts: any[] = [];
  userId = JSON.parse(localStorage.getItem('user') || '{}').id;

  // Sorting and filtering options
  sortOptions: string[] = ['Price: Low to High', 'Price: High to Low', 'Name: A-Z', 'Name: Z-A'];
  selectedSort: string = '';
  filterCategory: string = '';

  // Loading states
  isLoadingRecommendations: boolean = true;
  isLoadingTrending: boolean = true;

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.loadRecommendations();
    this.loadTrendingProducts();
  }

  // Load personalized recommendations for the user
  loadRecommendations(): void {
    this.isLoadingRecommendations = true;
    this.recommendationService.getRecommendations(this.userId).subscribe(data => {
      this.recommendations = data;
      this.applySorting(this.recommendations); // Apply sorting after loading
      this.isLoadingRecommendations = false;
    });
  }

  // Load globally trending products
  loadTrendingProducts(): void {
    this.isLoadingTrending = true;
    this.recommendationService.getTrendingProducts().subscribe(data => {
      this.trendingProducts = data;
      this.applySorting(this.trendingProducts); // Apply sorting after loading
      this.isLoadingTrending = false;
    });
  }

  // Apply sorting to a product list
  applySorting(productList: any[]): void {
    switch (this.selectedSort) {
      case 'Price: Low to High':
        productList.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        productList.sort((a, b) => b.price - a.price);
        break;
      case 'Name: A-Z':
        productList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name: Z-A':
        productList.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }

  // Remove a product from recommendations (e.g., "Not Interested" feedback)
  removeRecommendation(productId: string): void {
    const feedback = { userId: this.userId, productId, feedbackType: 'not_interested' };
    this.recommendationService.submitFeedback(feedback).subscribe(() => {
      this.recommendations = this.recommendations.filter(product => product.id !== productId);
    });
  }

  // Filter trending products by category
  filterTrendingProducts(category: string): void {
    this.filterCategory = category;
    if (category) {
      this.trendingProducts = this.trendingProducts.filter(product => product.category === category);
    } else {
      this.loadTrendingProducts(); // Reload all trending products if no category is selected
    }
  }
}
