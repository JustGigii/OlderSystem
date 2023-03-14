import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { MicrosoftMsalService } from 'src/app/services/login/microsoft-msal.service';
import { ReqestService } from 'src/app/services/reqest.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  name : string;
  isopen: boolean = false;

  constructor(private microsoftMsal: MicrosoftMsalService, private apiConnection: ReqestService) { 
    this.name = microsoftMsal.userProfile()?.name || '';
    // apiConnection.getUser(('3242692070')).subscribe(res => console.log(res), err => console.log(err.error));
  }

  ngOnInit(): void {
  }
 

}
