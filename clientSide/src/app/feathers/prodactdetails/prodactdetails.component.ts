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
  constructor(private reqestservice: ReqestService) { }

  ngOnInit(): void {
  }
  showOldersDetails():void
  {
    if(this.id == undefined)
      this.id =20  
    this.reqestservice.getOlder(this.id).subscribe((service) =>console.log(service))
  }

}
