// new features, displays recommended products for the user and includes category filtering functionality.

import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  recommendations: any[] = [];
  categories: string[] = ['Electronics', 'Books', 'Clothing', 'Home']; // Example categories
  selectedCategory: string = '';
  userId = JSON.parse(localStorage.getItem('user') || '{}').id;

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  // Load all recommendations for the user
  loadRecommendations(): void {
    this.recommendationService.getRecommendations(this.userId).subscribe(data => {
      this.recommendations = data;
    });
  }

  // Filter recommendations by category
  filterRecommendations(): void {
    if (this.selectedCategory) {
      this.recommendationService.getRecommendationsByCategory(this.userId, this.selectedCategory).subscribe(data => {
        this.recommendations = data;
      });
    } else {
      this.loadRecommendations(); // Reload all recommendations if no category is selected
    }
  }
}
