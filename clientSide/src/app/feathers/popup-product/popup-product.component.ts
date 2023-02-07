import { prodact } from './../../page tample/prodactTemplete';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { CartArrayService } from './../../services/cart-array.service';


@Component({
  selector: 'popup-product',
  templateUrl: './popup-product.component.html',
  styleUrls: ['./popup-product.component.scss']
})
export class PopupProductComponent implements OnInit {
  @Input() currProduct?: prodact;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<any> = new EventEmitter();

  wantedSizes: Array<{size: number, quantity: number}> = [];

  sizes: Record<number, string[]> = {
    1 : ["ג","ב","א"],
    2 : [],
    3 : ["מידשכלךש","מידת מכנסייםםםםםםם","מידת מכנסיים"],
    4 : ["XS","S","M","L","XL"],
    5 : ["ללא מידה"]
  };

  constructor(private cartArrayService: CartArrayService) {
    for (let i = 36; i <= 50; i++) {
      this.sizes["2"].push(String(i));
    }
    // if (sessionStorage.getItem("wantedSizes" + String(this.currProduct?.prodactId)) == null) {
    //   var storedArray = sessionStorage.getItem("wantedSizes" + String(this.currProduct?.prodactId));

    // } else {
    //   var storedArray = sessionStorage.getItem("wantedSizes" + String(this.currProduct?.prodactId));
    //   this.wantedSizes = JSON.parse(storedArray);
    // }
  }

  ngOnInit(): void {
    if (this.currProduct != undefined)
      this.wantedSizes = this.cartArrayService.getWantedSizes(this.currProduct.prodactId);
    console.table(this.wantedSizes);
  }

  closeDialog(){
    this.onClose.emit();
  }

  addSize(){
    this.wantedSizes.push({size: 0, quantity: 1});

    // sessionStorage.setItem("wantedSizes" + String(this.currProduct?.prodactId), JSON.stringify(this.wantedSizes));
  }

  addToCart(){
    this.sortWantedSizes();
    var addedProduct = {
      "pordactName" : this.currProduct?.pordactName,
      "prodactId" : this.currProduct?.prodactId,
      "prodactImage" : this.currProduct?.prodactImage,
      "typeSize" : this.currProduct?.typeSize,
      "wantedSizes" : this.wantedSizes
    }
    if (this.currProduct != undefined) {
      this.cartArrayService.saveWantedSizes(this.wantedSizes, this.currProduct?.prodactId);
    }
    this.onAddToCart.emit(addedProduct);
  }

  sortWantedSizes(){
  }

  onQuantityInput() {
  }
}
