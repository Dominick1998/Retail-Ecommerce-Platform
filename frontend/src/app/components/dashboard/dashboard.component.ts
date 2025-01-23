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

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.loadRecommendations();
    this.loadTrendingProducts();
  }

  // Load personalized recommendations for the user
  loadRecommendations(): void {
    this.recommendationService.getRecommendations(this.userId).subscribe(data => {
      this.recommendations = data;
    });
  }

  // Load globally trending products
  loadTrendingProducts(): void {
    this.recommendationService.getTrendingProducts().subscribe(data => {
      this.trendingProducts = data;
    });
  }

  // Remove a product from recommendations (e.g., "Not Interested" feedback)
  removeRecommendation(productId: string): void {
    const feedback = { userId: this.userId, productId, feedbackType: 'not_interested' };
    this.recommendationService.submitFeedback(feedback).subscribe(() => {
      this.recommendations = this.recommendations.filter(product => product.id !== productId);
    });
  }
}
