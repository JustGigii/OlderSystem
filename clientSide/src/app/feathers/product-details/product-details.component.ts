import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import { map, single } from 'rxjs';
import { iolderItemFull, iproduct } from 'src/app/page tample/homepage';
import { ReqestService } from 'src/app/services/reqest.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  id?: number
  @Input() prodactdetails?: iproduct[]
  constructor( private reqestservice: ReqestService)
  {

  }

  ngOnInit(): void {
    // this.reqestservice.getOlder(20).subscribe((service) => {this.filterMap(service)})
    if(this.prodactdetails)
    this.filterMap(this.prodactdetails)
  }
  // showOldersDetails():void
  // {
  //   // if(this.id == undefined)
  //   //   this.id =20
  //   // this.reqestservice.getOlder(this.id).subscribe((service) => {this.filterMap(service), console.log(this.prodactdetails)})
  // }

  filterMap(service:iproduct[]):void
  {
    console.log(service)
    if(service == undefined)
    {
      this.prodactdetails= service
      return
    }
    service.forEach(prodact => {
        let mapsize = new Map(Object.entries(prodact.sizes))
        let value = mapsize.get("0")
        if(value != undefined)
        {
          mapsize.delete('0');
          mapsize.set("",value);
        }

        prodact.sizes = mapsize
    });
      this.prodactdetails = service
  }
}