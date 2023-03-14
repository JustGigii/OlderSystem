import { Component } from '@angular/core';
import { startPageTemplate } from 'src/app/page tample/start-page';
import { MicrosoftMsalService } from 'src/app/services/login/microsoft-msal.service';
import { ReqestService } from '../../services/reqest.service'
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';


@Component({
  selector: 'app-start-page-login',
  templateUrl: './start-page-login.component.html',
  styleUrls: ['./start-page-login.component.scss']
})
export class StartPageLoginComponent {
  template: any = startPageTemplate[0];
  showProfilePage: boolean = true;
  profileIndex: number = 1;

  constructor(private microsoftMsal: MicrosoftMsalService, private apiConnection: ReqestService, private msalService: MsalService,) { }

  login() {
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account);
      
      // this.apiConnection.getUser(this.microsoftMsal.userID()).subscribe(
        this.apiConnection.getUser('123456789').subscribe(
        res => {
          console.log('exist user');
          this.showProfilePage = false; // exist user
        }, 
        err => {
          console.log('new user');
          this.showProfilePage = true; // new user
        }
      );
      })
  }
  isLogedIn(): boolean {
    return this.microsoftMsal.isLogedIn();
  }

}
