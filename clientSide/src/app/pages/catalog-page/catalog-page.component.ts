import { prodact } from './../../page tample/prodactTemplete';
import { ReqestService } from 'src/app/services/reqest.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  //all products available in storage
  products: prodact[]  = [];
  search: string = "";
  isClicked: boolean = false;
  currProduct?: prodact;

  animal: string = "";
  name: string = "d";

  constructor(private reqestService: ReqestService) {
  }

  ngOnInit(): void {
    this.reqestService.getProdacts().subscribe(element=>this.products = element );
  }

  onClick(product: prodact){
    this.currProduct = product;
    this.isClicked = true;
  }

  closeDialog(){
    this.isClicked = false;
  }
}
