import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OlderSystem';
  item: Number = 10
  @Output() closeEvent = new EventEmitter();

  ngOnInit(): void {
    var item = localStorage.getItem("item")
    if (item !== null) {
      this.item = parseInt(item);
    }
    console.log(this.item)
  }
  ChanePage(): void {
    var item = localStorage.getItem("item")
    if (item !== null) {
      this.item = parseInt(item);
    }
    // console.log(this.item)
  }

}
