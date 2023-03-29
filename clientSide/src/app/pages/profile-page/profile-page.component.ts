import { Component, EventEmitter } from '@angular/core';
import { iProfilePattern, ProfilePattern, iPages, iUserInfo } from 'src/app/page tample/profile';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormArray, RequiredValidator } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { TransformApiResService } from 'src/app/services/transform-api-res/transform-api-res.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  ProfilePagePattern: iProfilePattern; // page index: 0-show profile, 1-edit profile
  pagePattern: iPages = ProfilePattern.pages[0];

  @Input() page: string | undefined;
  @Input() userInfo: iUserInfo[] | undefined;
  @Output() selectedPage = new EventEmitter();

  editProfile = new FormGroup({
    fullName: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required)
  });

  constructor(private transformRes: TransformApiResService) {
    this.ProfilePagePattern = ProfilePattern;
  }

  ngOnInit(): void {
    this.ProfilePagePattern.pages[1].formGroup = this.editProfile;
    this.ProfilePagePattern.userInfo = this.userInfo || this.transformRes.nullUserInfo();  
    if(this.userInfo) { this.ProfilePagePattern.pages[0].title = this.userInfo[0].info; }

    if (this.page === 'new-user-profile') {
      this.pagePattern = ProfilePattern.pages[1];
      console.log("new user");
    } else {
      this.pagePattern = ProfilePattern.pages[0];
    }

    // this.pagePattern = ProfilePattern.pages[1];
  }

  submit() {
    // if (this.page === 'new-user-profile') {
    //   this.selectedPage.emit("home-page");
    // } else {
    //   switch (this.pagePattern.index) {
    //     case 0: this.pagePattern = this.ProfilePagePattern.pages[1];
    //       break;
    //     case 1: this.pagePattern = this.ProfilePagePattern.pages[0];
    //     if(this.page === 'new-user-profile')
    //     {
    //       // this.CreateUser()
    //     }
    //       console.log(this.editProfile)
    //       break;
    //   }
  
    // }
  }

  editClicked() {
    this.pagePattern = this.ProfilePagePattern.pages[1];
  }
  
  setValueFormGroup() {
    if(this.ProfilePagePattern.userInfo) {
      this.editProfile.controls['fullName'].setValue(this.ProfilePagePattern.userInfo[0].info);
    this.editProfile.controls['id'].setValue(this.ProfilePagePattern.userInfo[1].info);
    this.editProfile.controls['email'].setValue(this.ProfilePagePattern.userInfo[2].info);
    this.editProfile.controls['phoneNumber'].setValue(this.ProfilePagePattern.userInfo[3].info);
    }
  }
}

