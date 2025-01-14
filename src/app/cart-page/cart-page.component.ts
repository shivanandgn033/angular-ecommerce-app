import { Component } from '@angular/core';
import { cart, priceSummary } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductserviceService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails()

  }

  removeToCart(cartId: number | undefined) {
    cartId && this.cartData && this.product.removeToCart(cartId)
      .subscribe((result: any) => {
        this.loadDetails();
      })
  }

  loadDetails() {
    this.product.currentCart().subscribe((result: any) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item: any) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

      if (!this.cartData) {
        this.router.navigate(['/'])
      }

    })
  }


  checkout() {
    this.router.navigate(['/checkout'])
  }

}
