import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
@Output() closeEvent = new EventEmitter();

close(){
  this.closeEvent.emit();
}
}
