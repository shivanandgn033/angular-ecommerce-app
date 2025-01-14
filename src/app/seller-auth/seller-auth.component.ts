import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {

  showLogin = false;
  authError: String = '';
  constructor(private seller: SellerService) { }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: signUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }
  login(data: signUp): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError: any) => {
      if (isError) {
        this.authError = "Email or password is not correct";
      }
    })
  }
  openLogin() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }

}
