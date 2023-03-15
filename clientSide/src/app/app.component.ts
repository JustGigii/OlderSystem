import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OlderSystem';
  page: string = '';
  @Output() closeEvent = new EventEmitter();

  ngOnInit(): void {
  }
}
