import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { navPages } from 'src/app/page tample/nav-pages';
import { MicrosoftMsalService } from 'src/app/services/login/microsoft-msal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() selectedPage = new EventEmitter();
  item: number = 0;
  cssclass = ["show", "out", "out", "out"];

  constructor(private microsoftMsal: MicrosoftMsalService) {
  }

  ngOnInit(): void {
    if (this.microsoftMsal.isLogedIn()) {
      sessionStorage.removeItem("userLogged");
      // לבדוק לפני למילא פרטים אישיים
      this.selectedPage.emit(navPages[2]);
    } else {
      this.selectedPage.emit(navPages[0]);
    }
  }

  PageTitle(index: number): void {
    this.cssclass[this.item] = "unshow";
    this.cssclass[index] = "show";
    this.item = index;
    this.selectedPage.emit(navPages[index + 2]);
  }
}
