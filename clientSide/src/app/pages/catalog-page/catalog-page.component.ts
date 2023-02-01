import { prodact } from './../../page tample/prodactTemplete';
import { ReqestService } from 'src/app/services/reqest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  //all products available in storage
  products: prodact[]  = [];
  search: string = "";

  constructor(private reqestService: ReqestService) { }

  ngOnInit(): void {
    this.reqestService.getProdacts().subscribe(element=>this.products = element )
  }

  onClick(event: any){
    console.log(event.target.id);
  }
}
