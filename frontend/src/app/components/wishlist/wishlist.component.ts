import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: any = { productIds: [] };
  userId = JSON.parse(localStorage.getItem('user') || '{}').id;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistService.getWishlist(this.userId).subscribe(data => {
      this.wishlist = data;
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(this.userId, productId).subscribe(() => {
      this.loadWishlist();
    });
  }
}
