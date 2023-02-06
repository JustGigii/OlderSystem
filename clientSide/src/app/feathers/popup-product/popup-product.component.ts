import { prodact } from './../../page tample/prodactTemplete';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'popup-product',
  templateUrl: './popup-product.component.html',
  styleUrls: ['./popup-product.component.scss']
})
export class PopupProductComponent implements OnInit {
  @Input() currProduct?: prodact;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<any> = new EventEmitter();
  wantedSizes: Array<{size: number, quantity: number}> = new Array<{size: number, quantity: number}>;
  sizes: Record<number, string[]> = {
    1 : ["ג","ב","א"],
    2 : [],
    3 : ["מידשכלךש","מידת מכנסייםםםםםםם","מידת מכנסיים"],
    4 : ["XS","S","M","L","XL"],
    5 : ["ללא מידה"]
  };

  constructor() {
    for (let i = 36; i <= 50; i++) {
      this.sizes["2"].push(String(i));
    }
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.onClose.emit();
  }

  addSize(){
    this.wantedSizes.push({size: 0, quantity: 1});
  }

  addToCart(){
    this.sortWantedSizes();
    var addedProduct = {
      "pordactName" : this.currProduct?.pordactName,
      "prodactId" : this.currProduct?.prodactId,
      "wantedSizes" : this.wantedSizes
    }
    this.onAddToCart.emit(addedProduct);
  }

  sortWantedSizes(){
  }

  onQuantityInput() {
    console.log("invalid");
  }
}
