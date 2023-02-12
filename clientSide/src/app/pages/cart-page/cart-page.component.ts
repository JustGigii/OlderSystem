import { Component, OnInit } from '@angular/core';
import { iproduct } from './../../page tample/homepage';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cart: iproduct[] = [];

  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem("cartItemsArray") != null) {
      var storedArray = sessionStorage.getItem("cartItemsArray");
      this.cart = JSON.parse(storedArray || '{}');
    }
  }

  completeOrder(){
    console.table(this.cart);
  }
}
