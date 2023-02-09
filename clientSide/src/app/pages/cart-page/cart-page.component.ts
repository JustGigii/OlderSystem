import { CartArrayService } from './../../services/cart-array.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartItems: Array<any> = [];

  constructor(private cartArrayService: CartArrayService) { }

  ngOnInit(): void {
    // this.cartArrayService.cartItems.subscribe(c => {this.cartItems = c;});
    // console.table(this.cartItems);
    if (sessionStorage.getItem("cartItemsArray") != null) {
      var storedArray = sessionStorage.getItem("cartItemsArray");
      this.cartItems = JSON.parse(storedArray || '{}');
    }
  }

//make cart work


  completeOrder(){
    console.table(this.cartItems);
  }
}
