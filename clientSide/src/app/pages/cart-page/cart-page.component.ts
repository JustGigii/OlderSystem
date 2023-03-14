import { Component, OnInit } from '@angular/core';
import { iproduct } from './../../page tample/homepage';
import { NewOrderpordact, NewOrder } from './../../page tample/prodactTemplete';
import { ReqestService } from 'src/app/services/reqest.service';

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
  classes: string[] = ['ט', "י", "יא", "יב", "יג", "יד"];
  orderCart: NewOrderpordact[] = [];
  cart: iproduct[] = [];
  isOrderCompleted: boolean = false;

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

  completeOrder() {
    if (this.orderType != "" && this.cart.length != 0 && this.orderClass != "" && this.orderShluha != "") {
      for (let i = 0; i < this.cart.length; i++) {
        this.orderCart[i] = {
          pordactId: this.cart[i].pordactId,
          size: this.cart[i].sizes
        };
        
      }
      console.log(this.orderCart)
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
      console.log(newOrder)
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
    console.log("initializeVariables");
    sessionStorage.clear();
    this.cart.length = 0;
    this.orderType = "";
    this.orderClass = '';
    this.orderShluha = "";
    this.cart.length = 0;
    this.orderIsDraft = false;
  }
}
