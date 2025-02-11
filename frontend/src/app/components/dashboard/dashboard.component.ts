import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recommendations: any[] = [];
  trendingProducts: any[] = [];
  userId: string | null = '';
  isAuthenticated = false;
  isAdmin = false;
  username: string | null = '';

  // Sorting and filtering options
  sortOptions: string[] = ['Price: Low to High', 'Price: High to Low', 'Name: A-Z', 'Name: Z-A'];
  selectedSort: string = '';
  filterCategory: string = '';

  // Loading states
  isLoadingRecommendations: boolean = true;
  isLoadingTrending: boolean = true;

  constructor(private recommendationService: RecommendationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.loadRecommendations();
    this.loadTrendingProducts();

    // Listen for authentication changes
    this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      this.isAdmin = this.authService.isAdmin();
      this.userId = isAuth ? JSON.parse(localStorage.getItem('user') || '{}').id : null;
      this.username = this.userId ? 'User' : null;
      if (isAuth) {
        this.loadRecommendations();
      }
    });
  }

  checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.userId = this.isAuthenticated ? JSON.parse(localStorage.getItem('user') || '{}').id : null;
    this.username = this.userId ? 'User' : null;
  }

  // Load personalized recommendations for the user
  loadRecommendations(): void {
    if (!this.isAuthenticated || !this.userId) {
      this.recommendations = [];
      this.isLoadingRecommendations = false;
      return;
    }

    this.isLoadingRecommendations = true;
    this.recommendationService.getRecommendations(this.userId).subscribe(data => {
      this.recommendations = data;
      this.applySorting(this.recommendations);
      this.isLoadingRecommendations = false;
    });
  }

  // Load globally trending products
  loadTrendingProducts(): void {
    this.isLoadingTrending = true;
    this.recommendationService.getTrendingProducts().subscribe(data => {
      this.trendingProducts = data;
      this.applySorting(this.trendingProducts);
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
    if (!this.isAuthenticated || !this.userId) return;

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
