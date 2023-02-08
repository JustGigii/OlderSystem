import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  item: number = 0
  cssclass = ["out", "out", "out", "out"]
  constructor() { }

  ngOnInit(): void {
    var item = localStorage.getItem("item")
    if (item !== null) {
      this.item = parseInt(item);
      this.cssclass[this.item] = "show";
    }
  }

  selected(id: number): void {
    this.cssclass[this.item] = "unshow"
    this.cssclass[id] = "show"
    this.item = id
    localStorage.setItem("item", id.toString());
  }
}
