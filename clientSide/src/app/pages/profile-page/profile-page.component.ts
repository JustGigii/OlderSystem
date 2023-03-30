import { Component, EventEmitter } from '@angular/core';
import { iProfilePattern, ProfilePattern, iPages, iUserInfo, UserDetails } from 'src/app/page tample/profile';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormArray, RequiredValidator } from '@angular/forms';
import { Input, Output } from '@angular/core';
import { TransformApiResService } from 'src/app/services/transform-api-res/transform-api-res.service';
import { ReqestService } from 'src/app/services/reqest.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  ProfilePagePattern: iProfilePattern; // page index: 0-show profile, 1-edit profile
  pagePattern: iPages = ProfilePattern.pages[0];
  animation: string = '';

  @Input() user: UserDetails | undefined;
  @Input() page: string | undefined;
  @Output() selectedPage = new EventEmitter();

  editProfile = new FormGroup({
    fullName: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required)
  });

  constructor(private transformRes: TransformApiResService, private apiConnection: ReqestService) {
    this.ProfilePagePattern = ProfilePattern;
  }

  ngOnInit(): void {
    this.ProfilePagePattern.pages[1].formGroup = this.editProfile;
    this.ProfilePagePattern.userInfo = this.transformRes.getUserInfo(this.user);  
    this.setValueFormGroup();
    this.ProfilePagePattern.pages[0].title = this.user?.fullName || '';


    if (this.page === 'new-user-profile') {
      this.pagePattern = ProfilePattern.pages[1];
    } else {
      this.pagePattern = ProfilePattern.pages[0];
    }
  }

  submit() {
    if(this.editProfile.valid) {

      if(this.page === 'new-user-profile') { 
        this.selectedPage.emit('home-page');
      } else {
        this.animation = 'maximize';
        this.pagePattern = this.ProfilePagePattern.pages[0];

        // this.apiConnection.updateUser(this.createUserInterface()).subscribe(
        //   res => console.log(res),
        //   err => console.log(err),
        // );
      }
    }
  }

  editClicked() {
    this.pagePattern = this.ProfilePagePattern.pages[1];
    this.animation = 'minimize';
  }
  
  setValueFormGroup() {
    if(this.ProfilePagePattern.userInfo) {
      this.editProfile.controls['fullName'].setValue(this.user?.fullName || '');
      this.editProfile.controls['id'].setValue(this.user?.id || '');
      this.editProfile.controls['email'].setValue(this.user?.email || '');
      this.editProfile.controls['phoneNumber'].setValue(this.user?.phoneNumber || '');
    }
  }

  createUserInterface(): UserDetails {
    return {
        userId: this.user?.userId || 0,
        fullName: this.editProfile.controls['fullName'].value || '',
        id: this.ProfilePagePattern.userInfo[1].info,
        email: this.editProfile.controls['email'].value || '',
        phoneNumber: this.editProfile.controls['phoneNumber'].value || '',
        manageRole: this.user?.manageRole || 0,
    } 
  }
}

