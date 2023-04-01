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
  @Output() updatedUser = new EventEmitter();

  editProfile = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0][5][0-9]{8}")])
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
        this.apiConnection.postUser(this.createUserInterface()).subscribe(
          res => {
            this.user = res;
            this.ProfilePagePattern.userInfo = this.transformRes.getUserInfo(res);
            this.updatedUser.emit(res);
            this.selectedPage.emit('home-page');
          },
          err => console.log(err),
        )
      }
      else {
        if(this.isProfileChanged()) {
          this.apiConnection.updateUser(this.createUserInterface()).subscribe(
            res => {
              this.user = res;
              this.ProfilePagePattern.pages[0].title = res.fullName;
              this.ProfilePagePattern.userInfo = this.transformRes.getUserInfo(res);
              this.updatedUser.emit(res);
              this.animation = 'maximize'
              this.pagePattern = this.ProfilePagePattern.pages[0];             },
            err => console.log(err),
          );
        }
        else{
          this.backToProfileViewe();
        }
      }
    }
  }

  editClicked() {
    this.pagePattern = this.ProfilePagePattern.pages[1];
    this.animation = 'minimize';
  }

  backToProfileViewe() {
    this.setValueFormGroup();
    this.animation = 'maximize'
    this.pagePattern = this.ProfilePagePattern.pages[0]; 
  }
  
  setValueFormGroup() {
    if(this.ProfilePagePattern.userInfo) {
      this.editProfile.controls['fullName'].setValue(this.user?.fullName || '');
      this.editProfile.controls['email'].setValue(this.user?.email || '');
      this.editProfile.controls['phoneNumber'].setValue(this.user?.phoneNumber || '');
    }
  }

  isProfileChanged() {
    let newProfile = this.createUserInterface();

    return (this.user?.fullName != newProfile.fullName) || (this.user.email != newProfile.email) ||
      (this.user.phoneNumber != newProfile.phoneNumber);
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

