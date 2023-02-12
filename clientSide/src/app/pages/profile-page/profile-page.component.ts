import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { iProfilePattern, ProfilePattern, iPages } from 'src/app/page tample/profile';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormArray, RequiredValidator } from '@angular/forms';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  // index: 0-show profile, 1-edit profile
  ProfilePagePattern: iProfilePattern;
  pagePattern: iPages;

  editProfile = new FormGroup({
    fullName: new FormControl('', Validators.required),
    Id: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required)
  });

  constructor() {
    this.ProfilePagePattern = ProfilePattern;
    this.ProfilePagePattern.pages[1].formGroup = this.editProfile;
    this.pagePattern = ProfilePattern.pages[0];
  }

  ngOnInit(): void {
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
