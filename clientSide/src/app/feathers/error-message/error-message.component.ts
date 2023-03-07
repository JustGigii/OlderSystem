import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() errorText: string = "אנחנו לא יודעים מה קרה";
  @Input() errorTitle: string = "אופס!";
  @Input() exitText: string = "אישור";

  //Event for when user presses the confirm button
  @Output() onExit: EventEmitter<any> = new EventEmitter();

  confirm() {
    console.log("confirmed!");
    this.onExit.emit();
  }
}
