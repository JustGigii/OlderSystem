import { Component, OnInit } from '@angular/core';
import { iproduct } from './../../page tample/homepage';
import { NewOrderpordactsend, NewOrder } from './../../page tample/prodactTemplete';
import { ReqestService } from 'src/app/services/reqest.service';
import { shluhaArray, orderTypeArray, classesArray } from 'src/app/page tample/cart-page';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})

export class CartPageComponent implements OnInit {
  orderType: string = "";
  orderClass: string = "";
  orderStatus: number = 1;
  orderIsDraft: boolean = false;
  orderShluha: string = "";
  orderCart: NewOrderpordactsend[] = [];
  cart: iproduct[] = [];
  isOrderCompleted: boolean = false;
  isEditable: boolean = false;

  classesArray = classesArray;
  shluhaArray = shluhaArray;
  orderTypeArray = orderTypeArray;

  constructor(private reqestService: ReqestService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("cartItemsArray") != null) {
      var storedArray = sessionStorage.getItem("cartItemsArray");
      this.cart = JSON.parse(storedArray || '{}');
      this.cart.forEach(cell => {
        cell.sizes = new Map(JSON.parse(sessionStorage.getItem(`cartItemsArray${cell.pordactId}`) || '{}'));
      });
    }
  }

  toggleEditability() {
    this.isEditable = !this.isEditable;
  }

  removeProduct(product: iproduct) {
    this.cart.splice(this.cart.indexOf(product), 1)
    sessionStorage.setItem("cartItemsArray", JSON.stringify(this.cart));

  }

  completeOrder() {
    if (this.orderType != "" && this.cart.length != 0 && this.orderClass != "" && this.orderShluha != "") {
      for (let i = 0; i < this.cart.length; i++) {
        this.orderCart[i] = {
          pordactId: this.cart[i].pordactId,
          sizes: this.convertMapToObject(this.cart[i].sizes)
        };

      }
      var newOrder: NewOrder = {
        title: `${this.orderShluha} שכבה ${this.orderClass}`,
        userid: 1,
        type: this.orderType,
        date: new Date(),
        status: this.orderStatus,
        isdarft: this.orderIsDraft,
        prodact: this.orderCart
      }
      this.isOrderCompleted = true;
      this.reqestService.postOlder(newOrder).subscribe(response =>
        {
          console.log(response)
        });
      this.initializeVariables();
    } else {
      alert("cannot complete order");
    }
  }

  convertMapToObject(metricArguments: Map<string,number>): Record<string,number> {
    let newObject: Record<string,number> = {}
    for (let [key, value] of metricArguments) {
      newObject[key] = value;
    }
    return newObject;
  }

  initializeVariables() {
    sessionStorage.clear();
    this.cart.length = 0;
    this.orderType = "";
    this.orderClass = '';
    this.orderShluha = "";
    this.cart.length = 0;
    this.orderIsDraft = false;
  }
}
