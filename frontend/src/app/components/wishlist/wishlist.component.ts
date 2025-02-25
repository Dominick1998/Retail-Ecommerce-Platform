import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: any = { productIds: [] };
  isLoading = true;
  errorMessage = '';

  constructor(private wishlistService: WishlistService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.isLoading = true;
    this.wishlistService.getWishlist().subscribe({
      next: (data) => {
        this.wishlist = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading wishlist.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => this.loadWishlist(),
      error: (err) => {
        this.errorMessage = 'Error removing product from wishlist.';
        console.error(err);
      }
    });
  }
}
