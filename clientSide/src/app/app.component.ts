import { Component, OnInit } from '@angular/core';
import { UserDetails } from './page tample/profile';
import { ReqestService } from './services/reqest.service';
import { MicrosoftMsalService } from './services/login/microsoft-msal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'OlderSystem';
  page: string = '';
  user: UserDetails = {
    userId: 0,
    fullName: '',
    id: '',
    email: '',
    phoneNumber: '',
    manageRole: 0,
  };


  constructor( private apiConnection: ReqestService, private microsoftMsal: MicrosoftMsalService) {
    if(!sessionStorage.getItem('userLogged') && microsoftMsal.isLogedIn()) { 
      this.apiConnection.getUser(this.microsoftMsal.userID()).subscribe(
        res => this.user = res,
        err => this.page = 'new-user-profile',
      )
    }
  }
  ngOnInit(): void {  }
}
