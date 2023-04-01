import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isopen: boolean = false;
  @Input() userName: string | undefined;

  constructor() { 
  }

  ngOnInit(): void {
  }
 

}
