import { Component } from '@angular/core';
import { startPageTemplate } from 'src/app/page tample/start-page';
import { MicrosoftMsalService } from 'src/app/services/login/microsoft-msal.service';
import { ReqestService } from '../../services/reqest.service'


@Component({
  selector: 'app-start-page-login',
  templateUrl: './start-page-login.component.html',
  styleUrls: ['./start-page-login.component.scss']
})
export class StartPageLoginComponent {
  template: any = startPageTemplate[0];
  // l = this.isLogin();

  constructor(private microsoftMsal: MicrosoftMsalService, private apiRequest: ReqestService) { }

  login() {
    this.microsoftMsal.logIn();
    console.log(this.microsoftMsal.isLogedIn())
    if (this.microsoftMsal.isLogedIn()) {
      this.template = startPageTemplate[1];
    }

    setTimeout(() => {console.log(this.microsoftMsal.isLogedIn())}, 5000)
  }
  isLogedIn(): boolean {
    return this.microsoftMsal.isLogedIn();
  }

}