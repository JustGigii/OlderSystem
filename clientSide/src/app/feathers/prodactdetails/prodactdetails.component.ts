import { Component, OnInit } from '@angular/core';
import { map, single } from 'rxjs';
import { iolderItemFull } from 'src/app/page tample/homepage';
import { ReqestService } from 'src/app/services/reqest.service'
@Component({
  selector: 'app-prodactdetails',
  templateUrl: './prodactdetails.component.html',
  styleUrls: ['./prodactdetails.component.scss']
})
export class ProdactdetailsComponent implements OnInit {
  id?: number 
  prodactdetails?: iolderItemFull
  constructor(private reqestservice: ReqestService) { }

  ngOnInit(): void {
    this.reqestservice.getOlder(20).subscribe((service) => {this.filterMap(service)})
    
  }
  showOldersDetails():void
  {
    if(this.id == undefined)
      this.id =20  
    this.reqestservice.getOlder(this.id).subscribe((service) => {this.filterMap(service), console.log(this.prodactdetails)})
  }
  
  filterMap(service:iolderItemFull ):void
  {
    console.log(service.prodact)
    if(service.prodact == undefined)
    {
      this.prodactdetails= service
      return
    }
    service.prodact.forEach(prodact => {
        let mapsize = new Map(Object.entries(prodact.sizes))
        let value = mapsize.get("0")  
        if(value != undefined)
        {
          mapsize.delete('0');
          mapsize.set("כמות",value);
        }
        
        prodact.sizes = mapsize
    });
      this.prodactdetails = service
  }
}