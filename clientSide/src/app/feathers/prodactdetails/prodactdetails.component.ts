import { Component,Inject, OnInit } from '@angular/core';
import { map, single } from 'rxjs';
import { iolderItemFull, iproduct } from 'src/app/page tample/homepage';
import { ReqestService } from 'src/app/services/reqest.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-prodactdetails',
  templateUrl: './prodactdetails.component.html',
  styleUrls: ['./prodactdetails.component.scss']
})
export class ProdactdetailsComponent implements OnInit {
  id?: number 
  prodactdetails?: iproduct[]
  constructor(@Inject(MAT_DIALOG_DATA) public data:iproduct[],private reqestservice: ReqestService) 
  {
    this.filterMap(data)
  }

  ngOnInit(): void {
    // this.reqestservice.getOlder(20).subscribe((service) => {this.filterMap(service)})
    
  }
  showOldersDetails():void
  {
    // if(this.id == undefined)
    //   this.id =20  
    // this.reqestservice.getOlder(this.id).subscribe((service) => {this.filterMap(service), console.log(this.prodactdetails)})
  }
  
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
