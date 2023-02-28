import { prodact } from './../../page tample/prodactTemplete';
import { ReqestService } from 'src/app/services/reqest.service';
import { Component, OnInit, Inject } from '@angular/core';
import { iproduct } from 'src/app/page tample/homepage';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {
  //all products available in storage
  products: prodact[]  = [];
  cart: iproduct[] = [];
  sizes: [][] = [[]];
  search: string = "";
  currProduct?: prodact;

  constructor(private reqestService: ReqestService) {
  }

  ngOnInit(): void {
    this.reqestService.getProdacts().subscribe(element=>this.products = element );

    if (sessionStorage.getItem("cartItemsArray") != null) {
      var storedArray = sessionStorage.getItem("cartItemsArray");
      this.cart = JSON.parse(storedArray || '{}');
    }
  }

  onClick(product: prodact){
    this.currProduct = product;
  }

  closeDialog(){
    this.currProduct = undefined;
  }

  addToCart(addedProduct: any){
    if (this.cart.find(c => c.pordactId === addedProduct.pordactId)) {
      var foundIndex = this.cart.findIndex(x => x.pordactId == addedProduct.pordactId);
      this.cart.splice(foundIndex, 1);
      this.cart.unshift(addedProduct);
    } else {
      this.cart.unshift(addedProduct);
    }
    sessionStorage.setItem("cartItemsArray", JSON.stringify(this.cart));
    sessionStorage.setItem(`cartItemsArray${addedProduct.pordactId}`, JSON.stringify(Array.from(addedProduct.sizes.entries())));
  }
}
