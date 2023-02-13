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
  prodactName: string = "";
  prodactImage: string = "";

  addedSizes: Map<string, string> = new Map<string,string>();
  availableSizes: Array<any> = [];
  alreadyChosenSizes: Array<any> = [];
  previousSize: any;

  sizes: Record<number, string[]> = {
    1 : ["ג","ב","א"],
    2 : ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'],
    3 : ["מידשכלךש","מידת מכנסייםםםםםםם","מידת מכנסיים"],
    4 : ["XS","S","M","L","XL"],
    5 : ["ללא מידה"]
  };

  constructor() {}

  ngOnInit(): void {
    //Getting Id and TypeSize variables
    if (this.product) {
      this.productId = this.product.prodactId;
      this.productTypeSize = this.product.typeSize;
      this.prodactImage = this.product.prodactImage;
      this.prodactName = this.product.pordactName;
    }

    //Getting the info (addedSizes, alreadyChosenSizes, availableSizes) from session storage.
    // If there isn't any info (null), initializing variables for first use.
    if (sessionStorage.getItem(`addedSizes${String(this.productId)}`) != null) {
      var storedAddedSizes = sessionStorage.getItem(`addedSizes${String(this.productId)}`);
      this.addedSizes = new Map(JSON.parse(storedAddedSizes || '{}'));

      var storedAlreadyChosenSizes = sessionStorage.getItem(`alreadyChosenSizes${this.productId}`);
      this.alreadyChosenSizes = JSON.parse(storedAlreadyChosenSizes || '{}');

      var storedAvailableSizes = sessionStorage.getItem(`availableSizes${this.productId}`);
      this.availableSizes = JSON.parse(storedAvailableSizes || '{}');
    } else {
      this.sizes[this.productTypeSize].forEach(cell => {
        this.availableSizes.push(cell);
      });
    }
  }

  closeDialog(event: any){
    if (event.target.className.includes("closeDialog"))
      this.onClose.emit();
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
      alert("No more available sizes");
  }

  removeSize(sizeToRemove: string){
    //Removing the size from the map of wanted sizes
    this.addedSizes.delete(sizeToRemove);

    var index = this.alreadyChosenSizes.indexOf(sizeToRemove);
    this.alreadyChosenSizes.splice(index, 1);

    this.availableSizes.push(sizeToRemove);
    this.updateCurrentChosenSizes();
  }

  addToCart(){
    //Checking if there is something in the product added sizes
    if (this.addedSizes.size > 0) {
      this.sortAddedSizes();
      var addedProduct: iproduct = {
        pordactId: this.productId,
        pordactName: this.prodactName,
        prodactImage: this.prodactImage,
        sizes: this.addedSizes
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
    sessionStorage.setItem(`alreadyChosenSizes${this.productId}`, JSON.stringify(this.alreadyChosenSizes));
    sessionStorage.setItem(`availableSizes${this.productId}`, JSON.stringify(this.availableSizes));
  }

  onKeyInput(newSize: string) {
    //previousSize: Removing from alreadyChosenSizes, Adding to availableSizes
    var index = this.alreadyChosenSizes.indexOf(this.previousSize);
    this.alreadyChosenSizes.splice(index, 1);
    this.availableSizes.push(this.previousSize);

    //newSize: Removing from availableSizes, Adding to alreadyChosenSizes
    this.alreadyChosenSizes.push(newSize);
    index = this.availableSizes.indexOf(newSize);
    this.availableSizes.splice(index, 1);

    //Updating the addedSizes map according to the changes
    this.addedSizes.set(newSize, this.addedSizes.get(this.previousSize) || "");
    this.addedSizes.delete(this.previousSize);

    this.updateCurrentChosenSizes();
  }

  onValueInput(key: string, value: string){
    this.addedSizes.set(key, value);
    this.updateCurrentChosenSizes();
  }

  onFocus(value: any){
    this.previousSize = value;
  }
}
