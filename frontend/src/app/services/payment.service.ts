import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payment';

 constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number, currency: string = 'usd'): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, { amount, currency });
  }
}
