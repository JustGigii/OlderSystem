import { prodact } from './../../page tample/prodactTemplete';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartArrayService } from './../../services/cart-array.service';

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

  cartItemArray: Array<{size: string, quantity: number}> = [];
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

  constructor(private cartArrayService: CartArrayService) {
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

    this.cartItemArray = this.cartArrayService.getCartItem(this.productId);

    // var storedArray = sessionStorage.getItem("ourarraykey");
    // ourArray = JSON.parse(storedArray);
    // sessionStorage.setItem("alreadyChosenSizes",JSON.stringify(this.alreadyChosenSizes));
    if (sessionStorage.getItem("alreadyChosenSizes") == null) {
      this.alreadyChosenSizes = [];
      this.sizes[this.productTypeSize].forEach(cell => {
        this.availableSizes.push(cell);
      });
    } else {
      var storedArray = sessionStorage.getItem("alreadyChosenSizes");
      this.alreadyChosenSizes = JSON.parse(storedArray || '{}');

      var storedArray = sessionStorage.getItem("availableSizes");
      this.availableSizes = JSON.parse(storedArray || '{}');
    }
  }

  doThis() {
    console.log("this.availableSizes");
    console.table(this.availableSizes);
    console.log("this.alreadyChosenSizes");
    console.table(this.alreadyChosenSizes);
  }

  addSize(){
    //Checking if there are already a number (= the amount of available sizes for the product) of elements open
    if (this.cartItemArray.length != this.sizes[this.productTypeSize].length) {
      var sizeToAdd = this.availableSizes.pop();
      this.cartItemArray.push({size: sizeToAdd, quantity: 1});
      this.alreadyChosenSizes.push(sizeToAdd);
      this.updateCurrentChosenSizes();
    }
    else
      alert();
  }

  removeSize(sizeToRemove: any){
    //Removing the size from the cart
    var index = this.cartItemArray.indexOf(sizeToRemove);
    this.cartItemArray.splice(index, 1);

    index = this.alreadyChosenSizes.indexOf(sizeToRemove.size);
    this.alreadyChosenSizes.splice(index, 1);

    this.availableSizes.push(sizeToRemove.size);
    this.updateCurrentChosenSizes();
  }

  addToCart(){
    //Checking if there is something in the product wanted sizes
    if (this.cartItemArray.length > 0) {
      this.sortCartItemArray();
      var addedProduct = {
        "pordactName" : this.product?.pordactName,
        "prodactId" : this.product?.prodactId,
        "prodactImage" : this.product?.prodactImage,
        "typeSize" : this.product?.typeSize,
        "cartItemArray" : this.cartItemArray
      }
      this.cartArrayService.saveCartItem(this.cartItemArray, this.productId);
      this.onAddToCart.emit(addedProduct);
    } else
      alert("choose something to add to the cart");
  }

  sortCartItemArray() {
  }

  updateCurrentChosenSizes() {
    sessionStorage.setItem("alreadyChosenSizes",JSON.stringify(this.alreadyChosenSizes));
    sessionStorage.setItem("availableSizes",JSON.stringify(this.availableSizes));
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
