import { FormGroup } from "@angular/forms";

export const ProfilePattern: iProfilePattern =
{
    userInfo: [{
        title: 'שם מלא',
        info: ''
    }, {
        title: 'תעודת זהות',
        info: ''
    },
    {
        title: 'אימייל',
        info: ''
    },
    {
        title: 'מספר טלפון',
        info: ''
    }],
    pages:
        [{
            url: 'show-profile',
            title: '',
        },
        {
            url: 'edit-profile',
            title: 'עריכת פרטים אישיים',
            buttonText: "אישור",
            formGroup: null,
            element: [
                {
                    title: "שם מלא",
                    HTMLelement: "input",
                    validName: "fullName",
                },
                {
                    title: "אימייל",
                    HTMLelement: "input",
                    validName: "email",
                },
                {
                    title: "מספר טלפון",
                    HTMLelement: "input",
                    validName: "phoneNumber",
                }
            ]
        }]
};

export interface iProfilePattern {
    // profile: iProfile;
    userInfo: iUserInfo[];
    pages: iPages[];
}

export interface iUserInfo {
    title: string;
    info: string;
}

export interface iPages {
    url: string;
    title: string;
    buttonText?: string;
    element?: iElement[];
    formGroup?: FormGroup | null;
}

export interface iElement {
    title: string,
    text?: string
    HTMLelement?: string,
    validName: string,
}
export interface iProfile {
    fullName: string,
    id: string
    email: string,
    phoneNumber: string,
}
//גיגי
export interface UserDetails {
    userId: number,
    fullName: string,
    id: string,
    email: string,
    phoneNumber: string,
    manageRole: number,
}
export interface CreateUserDetails {
    fullName: string,
    id: string,
    email: string,
    phoneNumber: string,
    manageRole: number,
}

