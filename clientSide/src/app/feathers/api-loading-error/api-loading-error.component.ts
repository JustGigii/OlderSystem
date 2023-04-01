import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-api-loading-error',
  templateUrl: './api-loading-error.component.html',
  styleUrls: ['./api-loading-error.component.scss']
})
export class ApiLoadingErrorComponent {

  @Input() apiError: string | undefined;
  @Output() closeMessage = new EventEmitter();

  closeEvent() {
    if(this.closeMessage)
    this.closeMessage.emit(false);
  }
}
