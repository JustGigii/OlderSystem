import { Component, OnInit } from '@angular/core';
import { editProfile, iProfile } from 'src/app/page tample/profile';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  editProfileTemplate: iProfile;

  constructor() {
    this.editProfileTemplate = editProfile;
  }

  ngOnInit(): void {
  }

}
