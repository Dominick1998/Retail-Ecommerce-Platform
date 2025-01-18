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
  sortOptions: string[] = ['Price: Low to High', 'Price: High to Low', 'Name: A-Z', 'Name: Z-A'];
  selectedSort: string = '';
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
        this.applySorting(); // Apply sorting after filtering
      });
    } else {
      this.loadRecommendations(); // Reload all recommendations if no category is selected
    }
  }

  // Sort recommendations
  sortRecommendations(): void {
    this.applySorting();
  }

  private applySorting(): void {
    switch (this.selectedSort) {
      case 'Price: Low to High':
        this.recommendations.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        this.recommendations.sort((a, b) => b.price - a.price);
        break;
      case 'Name: A-Z':
        this.recommendations.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name: Z-A':
        this.recommendations.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }
}
