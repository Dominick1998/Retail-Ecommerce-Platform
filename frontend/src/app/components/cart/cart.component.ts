import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any = { items: [] };
  userId = JSON.parse(localStorage.getItem('user') || '{}').id;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.http.get(`http://localhost:8080/api/cart/${this.userId}`).subscribe((data: any) => {
      this.cart = data;
    });
  }

  removeItem(productId: string) {
    this.http.delete(`http://localhost:8080/api/cart/${this.userId}/${productId}`).subscribe(() => {
      this.loadCart();
    });
  }
}
