import { Component } from '@angular/core';
import { product } from '../data-type';
import { ProductserviceService } from '../services/productservice.service'
import { RouterLink } from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-seller-home',
  imports: [FontAwesomeModule,RouterLink,CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  constructor(private product: ProductserviceService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result:any) => {
      if (result) {
        this.productMessage = 'Product is deleted';

        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result:any) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
