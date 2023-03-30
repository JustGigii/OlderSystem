import { Injectable } from '@angular/core';
import { UserDetails, iUserInfo } from 'src/app/page tample/profile';

@Injectable({
  providedIn: 'root'
})
export class TransformApiResService {

  constructor() { }

  getUserInfo(response: UserDetails | undefined): iUserInfo[] {
    if(response) {
      return [{
        title: 'שם מלא',
        info: response.fullName,
      }, {
        title: 'תעודת זהות',
        info: response.id,
      },
      {
        title: 'אימייל',
        info: response.email,
      },
      {
        title: 'מספר טלפון',
        info: response.phoneNumber
      }];
    }
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
