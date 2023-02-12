import { iproduct } from './../../page tample/homepage';
import { prodact } from './../../page tample/prodactTemplete';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {NewOrderpordact} from './../../page tample/prodactTemplete';

@Component({
  selector: 'popup-product',
  templateUrl: './popup-product.component.html',
  styleUrls: ['./popup-product.component.scss']
})
export class PopupProductComponent implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<any> = new EventEmitter();

  @Input() product?: prodact;
  productId: number = 0;
  productTypeSize: number = 0;

  addedSizes: Map<string, string> =new Map<string,string>();
  availableSizes: Array<any> = [];
  alreadyChosenSizes: Array<any> = [];
  previousSize: any;

  sizes: Record<number, string[]> = {
    1 : ["ג","ב","א"],
    2 : [],
    3 : ["מידשכלךש","מידת מכנסייםםםםםםם","מידת מכנסיים"],
    4 : ["XS","S","M","L","XL"],
    5 : ["ללא מידה"]
  };

  constructor() {
    for (let i = 36; i <= 50; i++)
      this.sizes["2"].push(String(i));
  }

  closeDialog(){
    this.onClose.emit();
  }

  ngOnInit(): void {
    //Getting Id and TypeSize variables
    if (this.product != undefined) {
      this.productId = this.product.prodactId;
      this.productTypeSize = this.product.typeSize;
    }

    //Getting the added sizes from the past. if there werent any, the variable addedSizes is empty
    if (sessionStorage.getItem(`addedSizes${String(this.productId)}`) != null) {
      var storedArray = sessionStorage.getItem("addedSizes" + String(this.productId));
      this.addedSizes = new Map(JSON.parse(storedArray || '{}'));
    }

    if (sessionStorage.getItem(`alreadyChosenSizes${this.productId}`) == null)
      this.sizes[this.productTypeSize].forEach(cell => { this.availableSizes.push(cell); });
    else {
      var storedArray = sessionStorage.getItem("alreadyChosenSizes" + this.productId);
      this.alreadyChosenSizes = JSON.parse(storedArray || '{}');

      var storedArray = sessionStorage.getItem("availableSizes" + this.productId);
      this.availableSizes = JSON.parse(storedArray || '{}');
    }
  }

  doThis() {
    console.log("this.addedSizes");
    console.table(this.addedSizes);
  }

  addSize(){
    //Checking if there are already a number (= the amount of available sizes for the product) of elements open
    if (this.addedSizes.size != this.sizes[this.productTypeSize].length) {
      var sizeToAdd = this.availableSizes.pop();
      this.addedSizes.set(sizeToAdd, "1");
      this.alreadyChosenSizes.push(sizeToAdd);
      this.updateCurrentChosenSizes();
    }
    else
      alert("ffhsakhfsakfhsajfaskfas");
  }

  removeSize(sizeToRemove: any){
    //Removing the size from the cart
    this.addedSizes.delete(sizeToRemove);

    var index = this.alreadyChosenSizes.indexOf(sizeToRemove.size);
    this.alreadyChosenSizes.splice(index, 1);

    this.availableSizes.push(sizeToRemove.size);
    this.updateCurrentChosenSizes();
  }

  addToCart(){
    //Checking if there is something in the product wanted sizes
    if (this.addedSizes.size > 0) {
      this.sortAddedSizes();
      var addedProduct: NewOrderpordact = {
        pordactId: this.productId,
        size: this.addedSizes
      };
      this.updateCurrentChosenSizes();
      this.onAddToCart.emit(addedProduct);
    } else
      alert("choose something to add to the cart");
  }

  sortAddedSizes() {
  }

  updateCurrentChosenSizes() {
    sessionStorage.setItem(`addedSizes${String(this.productId)}`, JSON.stringify(Array.from(this.addedSizes.entries())));
    sessionStorage.setItem("alreadyChosenSizes" + this.productId, JSON.stringify(this.alreadyChosenSizes));
    sessionStorage.setItem("availableSizes" + this.productId, JSON.stringify(this.availableSizes));
  }

  onInput(newSize: string) {
    //previousSize: Removing from alreadyChosenSizes, Adding to availableSizes
    var index = this.alreadyChosenSizes.indexOf(this.previousSize);
    this.alreadyChosenSizes.splice(index, 1);
    this.availableSizes.push(this.previousSize);

    //newSize: Removing from availableSizes, Adding to alreadyChosenSizes
    this.alreadyChosenSizes.push(newSize);
    index = this.availableSizes.indexOf(newSize);
    this.availableSizes.splice(index, 1);

    this.updateCurrentChosenSizes();
  }

  onFocus(value: any){
    this.previousSize = value;
  }
}
