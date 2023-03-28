import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserDetails, iUserInfo } from './page tample/profile';
import { ReqestService } from './services/reqest.service';
import { MicrosoftMsalService } from './services/login/microsoft-msal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userInfo: iUserInfo[] | undefined;
  title = 'OlderSystem';
  page: string = '';


  constructor( private apiConnection: ReqestService, private microsoftMsal: MicrosoftMsalService) {
    if(!sessionStorage.getItem('userLogged')) { 
      this.apiConnection.getUser(this.microsoftMsal.userID()).subscribe(
        res => this.createUserInfo(res),
        err => console.log(err),
      )
    }
  }
  ngOnInit(): void {  }


  createUserInfo(apiRes: UserDetails) {
    
    this.userInfo = [{
      title: 'שם מלא',
      info: apiRes.fullName,
    }, {
      title: 'תעודת זהות',
      info: apiRes.id,
    },
    {
      title: 'אימייל',
      info: apiRes.email,
    },
    {
      title: 'מספר טלפון',
      info: apiRes.phoneNumber
    }];
  }
}
