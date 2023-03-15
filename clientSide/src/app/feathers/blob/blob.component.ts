import { trigger, state, style, animate, transition, query, group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { windowWhen } from 'rxjs';
import { iolderpage, homepage, iolderItemFull, ihomePage, iproduct } from 'src/app/page tample/homepage';
import { ReqestService } from 'src/app/services/reqest.service'
import { DatePipe } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.scss'],
  animations: [
    trigger('changeSize', [
      state('close', style({
        height: '72px'

      })),
      state('open', style({
        height: '275px'
      })),
      transition('open => close', [

        query('.hide', style({ opacity: 1 })),

        group([
          query('.hide', animate(300)),
          animate(350),])
      ]),
      transition('close=> open', [
        query('.hide', style({ opacity: 0 })),

        animate(350),
        query('.hide', animate(300, style({ opacity: 1 }))),
      ]),

    ]),
    trigger('flip', [
      state('close', style({
      })),
      state('open', style({
        transform: "rotateZ(180deg)"
      })),
    ])
  ]
})


export class BlobComponent implements OnInit {
  tamplate: ihomePage = homepage;
  prodactShow?: iproduct[]
  showdetails = true
  message: string = "";
  constructor(private reqestservice: ReqestService, public datepipe: DatePipe) { }
  //private dialogref: MatDialog
  ngOnInit(): void {
    homepage.items = []
    this.reqestservice.getOldersByUser(1).subscribe((service) => (service.forEach((element) => {
      var details: iolderpage = {
        data: element,
        fulldata: {} as iolderItemFull,
        currentState: 'close',
        statusMassage: "",
        date: ""
      }
      this.tamplate.items.unshift(details)

    })))
  }

  async doResize(item: iolderpage) {
    item.currentState = item.currentState == 'close' ? 'open' : 'close';
    if (item.currentState == 'open') {
      this.reqestservice.getOlder(item.data.olderiD).subscribe((service) => {
        item.fulldata = service
        item.date = this.datepipe.transform(item.fulldata?.date, 'dd-MM-yyyy') as string;
        switch (item.fulldata?.status) {
          case 1:
            item.statusMassage = "הזמנתך נשלחה וממתינה לאישור"
            break;
          case 2:
            item.statusMassage = "הזמנתך נקלטה בהצלחה"
            break;
          case 3:
            item.statusMassage = "הזמנך ממתינה לאיסוף"
            break;
          case 4:
            item.statusMassage = "הזמנתך נאספה!"
            break;
        }
      })
    }
  }

  ToPopup(prodacts?: iproduct[])
  {
    if(prodacts != undefined)
    {
      this.prodactShow = prodacts
    }
  }
}
