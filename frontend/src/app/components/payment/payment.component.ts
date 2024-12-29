import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentDetails = {
    cardNumber: '',
    expiration: '',
    cvv: '',
    amount: 0
  };

  constructor(private http: HttpClient, private router: Router) {}

  processPayment() {
    this.http.post('http://localhost:8080/api/payment', this.paymentDetails).subscribe({
      next: (response: any) => {
        alert(response.message);
        this.router.navigate(['/orders']);
      },
      error: () => {
        alert('Payment failed. Please try again.');
      }
    });
  }
}
