import { trigger, state, style, animate, transition, query, group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { windowWhen } from 'rxjs';
import { homepage, iolderItem } from 'src/app/page tample/homepage';
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
          height: '235px'
        })),
        transition('open => close',[
        
          query('.hide', style({ opacity: 1 })),

          group([
          query('.hide', animate(300 )),
          animate(350),])
        ]),
        transition('close=> open',[
          query('.hide', style({ opacity: 0 })),

          animate(350),
          query('.hide', animate(300 ,style({ opacity: 1 }))),
        ]),

      ]), 
        trigger('flip', [
          state('close', style({
            transform:"none",
          })),
          state('open', style({
            transform: "rotateX(180deg)",
                  offset: 0
          })),
        ])
    ]
})


export class BlobComponent implements OnInit {
  tamplate = homepage
  showdetails = true
  message:string =  "";
  constructor() { }

  ngOnInit(): void {

  }
  doResize(item: iolderItem ): void {
    item.currentState = item.currentState == 'close' ? 'open':'close';
    if(item.currentState == 'open' )
      {
        switch (item.status)
        {
          case 1:
            item.statusMassage= "הזמנתך נשלחה וממתינה לאישור"
            break;
            case 2:
            item.statusMassage= "הזמנתך נקלטה בהצלחה"
            break;
            case 3:
            item.statusMassage= "הזמנך ממתינה לאיסוף"
            break;
            case 4:
            item.statusMassage= "הזמנתך נאספה!"
            break;
        }
      }
  }
}
