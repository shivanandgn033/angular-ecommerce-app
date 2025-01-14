import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  orderData:order[]|undefined
  constructor(private product:ProductserviceService) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result:any)=>{
      if(result){
        this.getOrderList();
      }
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result:any)=>{
      this.orderData=result;
    })
  }
}
