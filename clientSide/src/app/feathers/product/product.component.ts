import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() name: string = "name";
  @Input() quantity: number = 0;
  @Input() src: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
