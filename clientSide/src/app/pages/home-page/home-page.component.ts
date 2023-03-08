import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  name : string ='אביטל'
  isopen: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
 

}
