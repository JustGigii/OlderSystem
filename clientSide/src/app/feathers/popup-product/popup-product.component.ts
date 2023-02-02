import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'popup-product',
  templateUrl: './popup-product.component.html',
  styleUrls: ['./popup-product.component.scss']
})
export class PopupProductComponent implements OnInit {
  @Input() currProduct?: number;

  constructor() { }

  ngOnInit(): void {
  }

}
