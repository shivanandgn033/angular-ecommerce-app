import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute, RouterEvent, RouterState } from '@angular/router';
import { ProductserviceService } from '../services/productservice.service';
import { routes } from '../app.routes';

@Component({
  selector: 'app-search',
  imports: [RouterState],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResult:undefined|product[]
  constructor(private activeRoute: ActivatedRoute, private product:ProductserviceService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProduct(query).subscribe((result:any)=>{
      this.searchResult=result;
      
    })
    

  }
}
