import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  stripeForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'auto'
  };

  constructor(
    private stripeService: StripeService,
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  handleCheckout(): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const name = this.stripeForm.get('name')?.value;

    // Create payment intent (amount in cents)
    this.paymentService.createPaymentIntent(2500).subscribe(response => {
      this.stripeService.confirmCardPayment(response.clientSecret, {
        payment_method: {
          card: this.card.element,
          billing_details: { name }
        }
      }).subscribe(result => {
        this.isLoading = false;

        if (result.error) {
          this.errorMessage = result.error.message || 'Payment failed';
        } else if (result.paymentIntent?.status === 'succeeded') {
          this.successMessage = 'Payment successful!';
        }
      });
    });
  }
}
