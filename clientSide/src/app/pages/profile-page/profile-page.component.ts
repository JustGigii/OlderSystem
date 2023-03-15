import { Component, EventEmitter } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { iProfilePattern, ProfilePattern, iPages } from 'src/app/page tample/profile';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormArray, RequiredValidator } from '@angular/forms';
import { ReqestService } from 'src/app/services/reqest.service';
import { MicrosoftMsalService } from 'src/app/services/login/microsoft-msal.service';
import { Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  ProfilePagePattern: iProfilePattern; // index: 0-show profile, 1-edit profile
  pagePattern: iPages = ProfilePattern.pages[0];
  // personalInfo: { name: string, id: string, email: string, phoneNum: string } = { name: '', id: '', email: '', phoneNum: '' };
  pro = ['fullName', 'id', 'email', 'phoneNumber']

  @Input() page: string | undefined;
  @Output() selectedPage = new EventEmitter();

  editProfile = new FormGroup({
    fullName: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required)
  });

  constructor(private apiConnection: ReqestService, private microsoftMsal: MicrosoftMsalService) {
    this.ProfilePagePattern = ProfilePattern;
    this.ProfilePagePattern.pages[1].formGroup = this.editProfile;
  }

  ngOnInit(): void {
    if (this.page === 'new-user-profile') {
      this.pagePattern = ProfilePattern.pages[1];
    } else {
      this.pagePattern = ProfilePattern.pages[0];
    }

    this.apiConnection.getUser(this.microsoftMsal.userID()).subscribe((
      response => {
        {
          this.ProfilePagePattern.userInfo = [{
            title: 'שם מלא',
            info: response.fullName
          }, {
            title: 'תעודת זהות',
            info: response.id
          }, {
            title: 'אימייל',
            info: response.email
          }, {
            title: 'מספר טלפון',
            info: response.phoneNumber
          }];
          this.setValueFormGroup();
        }
      }));
  }

  submit() {
    if (this.page === 'new-user-profile') {
      this.selectedPage.emit("home-page");
    } else {
      switch (this.pagePattern.index) {
        case 0: this.pagePattern = this.ProfilePagePattern.pages[1];
          break;
        case 1: this.pagePattern = this.ProfilePagePattern.pages[0];
          console.log(this.editProfile)
          break;
      }
    }
  }

  setValueFormGroup() {
    this.editProfile.controls['fullName'].setValue(this.ProfilePagePattern.userInfo[0].info);
    this.editProfile.controls['id'].setValue(this.ProfilePagePattern.userInfo[1].info);
    this.editProfile.controls['email'].setValue(this.ProfilePagePattern.userInfo[2].info);
    this.editProfile.controls['phoneNumber'].setValue(this.ProfilePagePattern.userInfo[3].info);
  }
}

