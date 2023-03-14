import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { iProfilePattern, ProfilePattern, iPages } from 'src/app/page tample/profile';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormArray, RequiredValidator } from '@angular/forms';
import { ReqestService } from 'src/app/services/reqest.service';
import { MicrosoftMsalService } from 'src/app/services/login/microsoft-msal.service';
import { UserDetails } from 'src/app/page tample/profile';
import { Input } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  ProfilePagePattern: iProfilePattern; // index: 0-show profile, 1-edit profile
  pagePattern: iPages = ProfilePattern.pages[0];
  personalInfo: { name: string, id: string, email: string, phoneNum: string } | undefined;

  @Input() pageIndex: number = 0;
  @Input() newUserTitle: string = '';

  editProfile = new FormGroup({
    fullName: new FormControl('', Validators.required),
    Id: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required)
  });

  constructor(private apiConnection: ReqestService, private microsoftMsal: MicrosoftMsalService) {
    this.ProfilePagePattern = ProfilePattern;



    this.ProfilePagePattern.pages[1].formGroup = this.editProfile;

    apiConnection.getUser(microsoftMsal.userID()).subscribe((
      response => {
        this.personalInfo = {
          name: response.fullName,
          id: response.id,
          email: response.email,
          phoneNum: response.phoneNumber
        }
      }));
  }

  ngOnInit(): void {
    this.pagePattern = ProfilePattern.pages[this.pageIndex];
    console.log(this.pageIndex)
  }

  submit() {
    switch (this.pagePattern.index) {
      case 0: this.pagePattern = this.ProfilePagePattern.pages[1];
        break;
      case 1: this.pagePattern = this.ProfilePagePattern.pages[0];
        break;
    }
  }
}
