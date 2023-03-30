import { Component, EventEmitter } from '@angular/core';
import { startPageTemplate } from 'src/app/page tample/start-page';
import { MicrosoftMsalService } from 'src/app/services/login/microsoft-msal.service';
import { ReqestService } from '../../services/reqest.service'
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Output } from '@angular/core';
import { TransformApiResService } from 'src/app/services/transform-api-res/transform-api-res.service';


@Component({
  selector: 'app-start-page-login',
  templateUrl: './start-page-login.component.html',
  styleUrls: ['./start-page-login.component.scss']
})
export class StartPageLoginComponent {
  template: any = startPageTemplate[0];

  @Output() selectedPage = new EventEmitter();
  @Output() userInfo = new EventEmitter();
  @Output() user = new EventEmitter();


  constructor(private microsoftMsal: MicrosoftMsalService, private apiConnection: ReqestService, private msalService: MsalService,
     private transformRes: TransformApiResService) { }

  login() {
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account);
      sessionStorage.setItem('userLogged', 'login');

      // this.apiConnection.getUser(this.microsoftMsal.userID()).subscribe(
      this.apiConnection.getUser('324262070').subscribe(
        res => {
          this.selectedPage.emit('home-page'); //exist user
          this.userInfo.emit(res);
          this.user.emit(res);
        },
        err => {
          this.selectedPage.emit('new-user-profile'); // new user
          this.userInfo.emit(this.transformRes.NullApiRes());
        }
      );
    })
  }
  isLogedIn(): boolean {
    return this.microsoftMsal.isLogedIn();
  }
}
