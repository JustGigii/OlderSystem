import { NewOrderpordact } from './../page tample/prodactTemplete';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartArrayService {
  numOfProducts: number = 8;

  cartItemsArray: Array<any> = [];
  cartItems: BehaviorSubject<Array<any>>;

  constructor() {
    this.cartItems = new BehaviorSubject(this.cartItemsArray);
    if (sessionStorage.getItem("cartItemsArray") != null) {
      var storedArray = sessionStorage.getItem("cartItemsArray");
      this.cartItemsArray = JSON.parse(storedArray || '{}');
    }
  }

  addToCart(item: any) {
    this.cartItemsArray.unshift(item);
    sessionStorage.setItem("cartItemsArray", JSON.stringify(this.cartItemsArray));
  }
}
