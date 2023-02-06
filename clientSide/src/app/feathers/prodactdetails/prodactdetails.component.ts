import { Component, OnInit } from '@angular/core';
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
    this.reqestservice.getOlder(20).subscribe((service) => {this.prodactdetails = service, console.log(this.prodactdetails)})
  }
  showOldersDetails():void
  {
    if(this.id == undefined)
      this.id =20  
    this.reqestservice.getOlder(this.id).subscribe((service) => {this.prodactdetails = service, console.log(this.prodactdetails)})
  }
}
