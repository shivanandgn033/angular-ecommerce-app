import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../services/productservice.service';
import { product } from '../data-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage: string | undefined;
  constructor(private product: ProductserviceService) {}

  ngOnInit(): void {}

  submit(data: product) {
    this.product.addProduct(data).subscribe((result:any) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }

}
