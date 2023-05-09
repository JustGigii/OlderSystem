import { Component, OnInit } from '@angular/core';
import { iproduct } from './../../page tample/homepage';
import { NewOrderpordactsend, NewOrder } from './../../page tample/prodactTemplete';
import { ReqestService } from 'src/app/services/reqest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { shluhaArray, orderTypeArray, classesArray } from 'src/app/page tample/cart-page';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})

export class CartPageComponent implements OnInit {
  orderStatus: number = 1;
  cart: iproduct[] = [];
  isOrderCompleted: boolean = false;
  isEditable: string = '';

  orderForm = new FormGroup({
    orderType: new FormControl('', Validators.required),
    orderClass: new FormControl('', Validators.required),
    orderIsDraft: new FormControl(false, Validators.required),
    orderShluha: new FormControl('', Validators.required),
  })

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
    this.isEditable = this.isEditable === 'editing' ? 'not-editing' : 'editing';
  }

  removeProduct(product: iproduct) {
    this.cart.splice(this.cart.indexOf(product), 1)
    sessionStorage.setItem("cartItemsArray", JSON.stringify(this.cart));
  }

  completeOrder() {
    if (this.cart.length != 0 && this.orderForm.valid) {
      var newOrder: NewOrder = {
        title: `${this.orderForm.controls["orderShluha"].value} שכבה ${this.orderForm.controls["orderClass"].value}`,
        userid: 1,
        type: this.orderForm.controls["orderType"].value || '',
        date: new Date(),
        status: this.orderStatus,
        isdarft: this.orderForm.controls["orderIsDraft"].value || false,
        prodact: this.convertToNewOrderProduct()
      }
      this.isOrderCompleted = true;
      console.table(newOrder);
      // this.reqestService.postOlder(newOrder).subscribe(response =>
      //   {
      //     console.log(response)
      //   });

      // initialize variables
      sessionStorage.clear();
      this.cart.length = 0;
    }
  }

  convertToNewOrderProduct(){
    var orderCart: NewOrderpordactsend[] = [];
    for (let i = 0; i < this.cart.length; i++) {
      orderCart[i] = {
        pordactId: this.cart[i].pordactId,
        sizes: this.convertMapToObject(this.cart[i].sizes)
      };
    }

    return orderCart;
  }

  convertMapToObject(metricArguments: Map<string,number>): Record<string,number> {
    let newObject: Record<string,number> = {}
    for (let [key, value] of metricArguments) {
      newObject[key] = value;
    }
    return newObject;
  }
}
