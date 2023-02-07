import { prodact } from './../../page tample/prodactTemplete';
import { ReqestService } from 'src/app/services/reqest.service';
import { CartArrayService } from './../../services/cart-array.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  //all products available in storage
  products: prodact[]  = [];
  sizes: [][] = [[]];
  search: string = "";
  currProduct?: prodact;
  cart: Array<any> = [];

  constructor(private reqestService: ReqestService, private cartArrayService: CartArrayService) {
  }

  ngOnInit(): void {
    this.reqestService.getProdacts().subscribe(element=>this.products = element );
  }

  onClick(product: prodact){
    this.currProduct = product;
  }

  closeDialog(){
    this.currProduct = undefined;
  }

  addToCart(addedProduct: any){
    this.cart.unshift(addedProduct);
    this.cartArrayService.addToCart(addedProduct);
  }
}
