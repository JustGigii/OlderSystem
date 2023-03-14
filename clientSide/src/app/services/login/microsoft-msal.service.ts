// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { observable, Observable, Observer } from 'rxjs';
import { ReqestService } from '../reqest.service';
import { of } from 'rxjs';
enum UserStatus{
  NEWUSER,
  EXISTUSER
}
@Injectable({
  providedIn: 'root'
})
export class MicrosoftMsalService {

  constructor(private msalService: MsalService, private apiConnection: ReqestService) { }

  logIn() {
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        })
  }
  
  logOut() {
    if (this.isLogedIn()) { this.msalService.logout(); }
  }

  isLogedIn(): boolean {
    sessionStorage.removeItem('msal.interaction.status');
    return this.msalService.instance.getActiveAccount() != null;
  }

  userProfile()  {
    return this.msalService.instance.getActiveAccount()?.idTokenClaims;
  }

  userID(): any {
    let userID: string = this.userProfile()?.preferred_username || '';
    return userID = userID.split("@")[0]; //id from Email
    
    return this.apiConnection.getUser((userID)).subscribe(
      res => {
        return UserStatus.EXISTUSER;
      }, 
      err => {
        return UserStatus.NEWUSER;
      });
      return 1;
  }
}
