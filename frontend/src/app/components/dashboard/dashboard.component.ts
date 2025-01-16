import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recommendations: any[] = [];
  userId = JSON.parse(localStorage.getItem('user') || '{}').id;

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  loadRecommendations(): void {
    this.recommendationService.getRecommendations(this.userId).subscribe(data => {
      this.recommendations = data;
    });
  }
}
