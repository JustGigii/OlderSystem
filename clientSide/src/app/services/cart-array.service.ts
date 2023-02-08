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

    for (let i = 0; i < this.numOfProducts; i++) {
      this.tempCartItemsArray[i] = [];
    }
  }

  addToCart(item: any) {
    this.cartItemsArray.unshift(item);
  }

  saveCartItem(s: Array<{size: string, quantity: number}>, index: number){
    this.tempCartItemsArray[index] = s;
  }

  getCartItem(index: number){
    return this.tempCartItemsArray[index];
  }
}
