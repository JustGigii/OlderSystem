import { prodact } from './../../page tample/prodactTemplete';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'popup-product',
  templateUrl: './popup-product.component.html',
  styleUrls: ['./popup-product.component.scss']
})
export class PopupProductComponent implements OnInit {
  @Input() currProduct?: prodact;
  @Output() onClose: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.onClose.emit();
  }

  //add each size to dictionary, 
}
