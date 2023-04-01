import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ReqestService } from 'src/app/services/reqest.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isopen: boolean = false;
  @Input() userName: string | undefined;

  constructor(private apiConnection: ReqestService) { 
    // this.name = microsoftMsal.userProfile()?.name || '';
    // apiConnection.getUser(('3242692070')).subscribe(res => console.log(res), err => console.log(err.error));
  }

  ngOnInit(): void {
  }
 

}
