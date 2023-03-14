// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftMsalService {

  constructor(private msalService: MsalService) { }

  logIn() {
    this.msalService.loginPopup().subscribe((Response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(Response.account);
    });
  }

  logOut() {
    if (this.isLogedIn()) { this.msalService.logout(); }
  }

  isLogedIn(): boolean {
    sessionStorage.removeItem('msal.interaction.status');
    return this.msalService.instance.getActiveAccount() != null;
  }

  isManager(): boolean {
    const accountConnected = this.msalService.instance.getActiveAccount()?.idTokenClaims;
    if (accountConnected?.roles?.includes('Mannger') === true)
      return true;
    return false;
  }
}
