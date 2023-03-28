import { Injectable } from '@angular/core';
import { UserDetails, iUserInfo } from 'src/app/page tample/profile';

@Injectable({
  providedIn: 'root'
})
export class TransformApiResService {

  constructor() { }

  NullApiRes() {
    return {
      userId: '',
      fullName: '',
      id: '',
      email: '',
      phoneNumber: '',
      manageRole: '',
    };
  }

  nullUserInfo(): iUserInfo[] {
    
    return [{
      title: 'שם מלא',
      info: '',
    }, {
      title: 'תעודת זהות',
      info: '',
    },
    {
      title: 'אימייל',
      info: '',
    },
    {
      title: 'מספר טלפון',
      info: ''
    }];
  }
}
