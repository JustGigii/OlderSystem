import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: any;

  constructor() { }

  ngOnInit(): void {
  }

  check(){
    console.log("check");
    console.table(this.cartItem.pordactName);
  }

}
