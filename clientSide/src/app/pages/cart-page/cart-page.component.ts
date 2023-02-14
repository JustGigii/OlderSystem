import { Component, OnInit } from '@angular/core';
import { iproduct } from './../../page tample/homepage';
import { NewOrderpordact, NewOrder } from './../../page tample/prodactTemplete';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  orderTitle: string = "";
  orderType: string = "";
  orderStatus: number = 1;
  orderCart: NewOrderpordact[] = [];
  cart: iproduct[] = [];
  isOrderCompleted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem("cartItemsArray") != null) {
      var storedArray = sessionStorage.getItem("cartItemsArray");
      this.cart = JSON.parse(storedArray || '{}');
      this.cart.forEach(cell => {
        cell.sizes = new Map(JSON.parse(sessionStorage.getItem(`cartItemsArray${cell.pordactId}`) || '{}'));
      });
    }
  }

  completeOrder(){
    if (this.orderTitle != "" && this.orderType != "" && this.cart.length != 0) {
      for (let i = 0; i < this.cart.length; i++) {
        this.orderCart[i] = {
          pordactId: this.cart[i].pordactId,
          size: this.cart[i].sizes
        };
      }

      var newOrder: NewOrder = {
        title: this.orderTitle,
        type: this.orderType,
        date: new Date(),
        status: this.orderStatus,
        isdarft: true,
        prodact: this.orderCart
      }

      this.isOrderCompleted = true;
      console.table(newOrder);
      //sending to backend
      this.initializeVariables();
    } else {
      alert("cannot complete order");
    }
  }

  initializeVariables() {
    console.log("initializeVariables");
    sessionStorage.clear();
    this.cart.length = 0;
    this.orderTitle = "";
    this.orderType = "";
    this.cart.length = 0;
  }
}
