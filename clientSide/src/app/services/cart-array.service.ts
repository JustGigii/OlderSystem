import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartArrayService {
  cartItemsArray: Array<any> = [];
  cartItems: BehaviorSubject<Array<any>>;

  wantedSizesArray: Array<Array<{size: number, quantity: number}>> = [[]];
  wantedSizes: BehaviorSubject<Array<Array<{size: number, quantity: number}>>>;

  constructor() {
    this.cartItems = new BehaviorSubject(this.cartItemsArray);
    this.wantedSizes = new BehaviorSubject(this.wantedSizesArray);

    for (let i = 0; i < 8; i++) {
      this.wantedSizesArray[i] = [];
    }
  }

  addToCart(item: any) {
    this.cartItemsArray.unshift(item);
  }

  saveWantedSizes(s: Array<{size: number, quantity: number}>, index: number){
    this.wantedSizesArray[index] = s;
    // console.table(this.wantedSizesArray);
  }

  getWantedSizes(index: number){
    console.table(this.wantedSizesArray);
    return this.wantedSizesArray[index];
  }
}
