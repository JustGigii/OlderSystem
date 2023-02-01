import { Component, OnInit } from '@angular/core';
import { ProductComponent } from 'src/app/feathers/product/product.component';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  //all products available in storage
  products: Array<ProductComponent> = [];

  //temp name of product (instead of product.name)
  name: string = "currentName";

  //temp src of product img (instead of product.src)
  src: string = "i am src";

  constructor() { }

  ngOnInit(): void {
  }

}
