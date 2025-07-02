import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  stripe: Stripe | null = null;
  clientSecret: string = '';
  isLoading = false;

 constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_YOUR_PUBLIC_KEY'); // Replace with your Stripe public key
  }

  handleCheckout() {
    this.isLoading = true;
