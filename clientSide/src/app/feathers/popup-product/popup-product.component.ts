import { sizes } from './../../page tample/popup-product';
import { iproduct } from './../../page tample/homepage';
import { prodact } from './../../page tample/prodactTemplete';
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { messages } from './../../page tample/popup-product';

@Component({
  selector: 'popup-product',
  templateUrl: './popup-product.component.html',
  styleUrls: ['./popup-product.component.scss']
})
export class PopupProductComponent implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<any> = new EventEmitter();


  //add other compenent to add prodact
  @Input() product: prodact = {prodactId: 1, prodactImage: "", pordactName: "", typeSize: 1};
  f = false;
  addedSizes: Map<string, number> = new Map<string,number>();
  availableSizes: Array<any> = [];
  alreadyChosenSizes: Array<any> = [];
  previousSize: any;
  addedToCart: boolean = false;

  messages = messages;
  sizes = sizes ;

  ngOnInit(): void {
    //Getting the info (addedSizes, alreadyChosenSizes, availableSizes) from session storage.
    if (sessionStorage.getItem(`addedSizes${String(this.product.prodactId)}`) != null) {
      var storedAddedSizes = sessionStorage.getItem(`addedSizes${String(this.product.prodactId)}`);
      this.addedSizes = new Map(JSON.parse(storedAddedSizes || '{}'));

      var storedAlreadyChosenSizes = sessionStorage.getItem(`alreadyChosenSizes${this.product.prodactId}`);
      this.alreadyChosenSizes = JSON.parse(storedAlreadyChosenSizes || '{}');

      var storedAvailableSizes = sessionStorage.getItem(`availableSizes${this.product.prodactId}`);
      this.availableSizes = JSON.parse(storedAvailableSizes || '{}');
      }
      //If there isn't any info (null), initializing variables for first use.
    else {
      this.sizes[this.product.typeSize].forEach(cell => {
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
    if (this.addedSizes.size != this.sizes[this.product.typeSize].length) {
      var sizeToAdd = this.availableSizes.pop();
      this.addedSizes.set(sizeToAdd, 1);
      this.alreadyChosenSizes.push(sizeToAdd);
    }
    else
      alert("No more available sizes"); //erro
  }

  addToCart(){
    //Checking if there is something in the product added sizes
    if (!this.areAllQuantitiesValid()) {
      alert("quantity 0"); //erro massage
    } else {
      if (this.addedSizes.size > 0) {
        this.addedToCart = true;
        this.sortAddedSizes();
        this.onAddToCart.emit(this.product);
        setTimeout(() => {
          this.onClose.emit();
        }, 1200);
      } else
        alert("choose something to add to the cart"); //erro
    }
  }
  checkIfOver100(strNum: number){
    return Number(strNum) > 100;
  }

  areAllQuantitiesValid(): boolean {
    var flag = true;
    this.addedSizes.forEach((value) => {
      if (Number(value) <= 0 || Number(value) > 100) {
        flag = false;
      }
    });
    return flag;
  }

  sortAddedSizes() {
  }

  ngOnDestroy() {
    sessionStorage.setItem(`addedSizes${String(this.product.prodactId)}`, JSON.stringify(Array.from(this.addedSizes.entries())));
    sessionStorage.setItem(`alreadyChosenSizes${this.product.prodactId}`, JSON.stringify(this.alreadyChosenSizes));
    sessionStorage.setItem(`availableSizes${this.product.prodactId}`, JSON.stringify(this.availableSizes));
  }

  removeSize(sizeToRemove: string){
    //Removing the size from the map of wanted sizes
    this.addedSizes.delete(sizeToRemove);

    var index = this.alreadyChosenSizes.indexOf(sizeToRemove);
    this.alreadyChosenSizes.splice(index, 1);

    this.availableSizes.push(sizeToRemove);
  }

  onKeyInput(newSize: string) { //make it genric with remove size
    //previousSize: Removing from alreadyChosenSizes, Adding to availableSizes
    var index = this.alreadyChosenSizes.indexOf(this.previousSize);
    this.alreadyChosenSizes.splice(index, 1);
    this.availableSizes.push(this.previousSize);

    //newSize: Removing from availableSizes, Adding to alreadyChosenSizes
    this.alreadyChosenSizes.push(newSize);
    index = this.availableSizes.indexOf(newSize);
    this.availableSizes.splice(index, 1);

    //Updating the addedSizes map according to the changes
    this.addedSizes.set(newSize, this.addedSizes.get(this.previousSize) || 1);
    this.addedSizes.delete(this.previousSize);
  }

  onValueInput(key: string, value: number){
    this.addedSizes.set(key, value);
  }
}
