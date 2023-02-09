import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartArrayService {
  numOfProducts: number = 8;

  cartItemsArray: Array<any> = [];
  cartItems: BehaviorSubject<Array<any>>;

  tempCartItemsArray: Array<Array<{size: string, quantity: number}>> = [[]];
  tempCartItems: BehaviorSubject<Array<Array<{size: string, quantity: number}>>>;

  constructor() {
    this.cartItems = new BehaviorSubject(this.cartItemsArray);
    this.tempCartItems = new BehaviorSubject(this.tempCartItemsArray);

    if (sessionStorage.getItem("tempCartItemsArray") == null) {
      for (let i = 0; i < this.numOfProducts; i++) {
        this.tempCartItemsArray[i] = [];
      }
    } else {
      var storedArray = sessionStorage.getItem("tempCartItemsArray");
      this.tempCartItemsArray = JSON.parse(storedArray || '{}');
    }
    console.table(this.tempCartItemsArray);


    if (sessionStorage.getItem("cartItemsArray") != null) {
      var storedArray = sessionStorage.getItem("cartItemsArray");
      this.cartItemsArray = JSON.parse(storedArray || '{}');
    }
  }

  addToCart(item: any) {
    this.cartItemsArray.unshift(item);
    sessionStorage.setItem("cartItemsArray", JSON.stringify(this.cartItemsArray));
  }

  saveCartItem(s: Array<{size: string, quantity: number}>, index: number){
    this.tempCartItemsArray[index] = s;
    sessionStorage.setItem("tempCartItemsArray", JSON.stringify(this.tempCartItemsArray));
  }

  getCartItem(index: number){
    return this.tempCartItemsArray[index];
  }
}
