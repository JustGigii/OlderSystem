import { Component, OnInit, Input } from '@angular/core';
import { iproduct } from 'src/app/page tample/homepage';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem?: iproduct;
  sizes?: Map<string, string>;

  constructor() { }

  ngOnInit(): void {
    if (this.cartItem)
      this.sizes = new Map(JSON.parse(sessionStorage.getItem(`cartItemsArray${this.cartItem.pordactId}`) || '{}'));
  }
}
