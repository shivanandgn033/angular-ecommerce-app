import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductserviceService } from '../services/productservice.service';
import { cart, order } from '../data-type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData: cart[] =[];
  orderMsg: string | undefined;
  constructor(private product: ProductserviceService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result:cart[]) => {

      let price = 0;
      this.cartData = result;
      result.forEach((item:any) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);

      console.warn(this.totalPrice);

    })

  }
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
     
      this.cartData.forEach((item:cart) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700)
      })

      this.product.orderNow(orderData).subscribe((result:any) => {
        if (result) {
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders'])
          }, 4000);

        }

      })
    }

  }

}
