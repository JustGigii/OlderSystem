import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { navPages } from 'src/app/page tample/nav-pages';
import { MicrosoftMsalService } from 'src/app/services/login/microsoft-msal.service';
import { UserDetails } from 'src/app/page tample/profile';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() selectedPage = new EventEmitter();
  item: number = 0;
  // cssclass = ["show", "out", "out", "out"];
  cssclass = ["show", "unshow", "unshow", "unshow"];


  constructor(private microsoftMsal: MicrosoftMsalService) {
  }

  ngOnInit(): void {

    if (this.microsoftMsal.isLogedIn()) {
      sessionStorage.removeItem("userLogged");
      this.selectedPage.emit(navPages[2]); 
    } else {
      this.selectedPage.emit(navPages[0]);
    }
  }

  navigatePage(index: number): void {
    this.cssclass[this.item] = "unshow";
    this.cssclass[index] = "show";
    this.item = index;
    this.selectedPage.emit(navPages[index + 2]);
  }
}
