import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  popularProducts:undefined|product[];
 trendyProducts:undefined | product[];
  constructor(private product:ProductserviceService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data:any)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data:any)=>{
      this.trendyProducts=data;
    })
  }

}
