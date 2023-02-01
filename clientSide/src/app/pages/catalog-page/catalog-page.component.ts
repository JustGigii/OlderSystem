import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  //all products available in storage
  products: Array<any> = [
    {
      name: "חולצת בנים א",
      src: "dsv"
    },
    {
      name: "חולצת בנות ב",
      src: "gdsg"
    },
    {
      name: "כומתה",
      src: "gdsg"
    },
    {
      name: "גיגי",
      src: "gdsg"
    },
    {
      name: "גיגית",
      src: "gdsg"
    },
    {
      name: "גיגון",
      src: "gdsg"
    },
    {
      name: "גיגסון",
      src: "gdsg"
    },
    {
      name: "עוד משהו",
      src: "gdsg"
    },
    {
      name: "פריט לבוש",
      src: "gdsg"
    },
    {
      name: "דשבשדבדש",
      src: "gdsg"
    },
    {
      name: "עשדיש",
      src: "gdsg"
    },
    {
      name: "עדשים",
      src: "gdsg"
    }
  ];
  search: string = "";

  constructor() { }

  ngOnInit(): void {
  }
}
