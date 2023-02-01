import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  item: number = 1
  constructor() { }

  ngOnInit(): void {
  }

  selected(id: number):void{
    this.item =id
  }
}
