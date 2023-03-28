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
            // index: 0,
            title: 'הפרופיל שלי',
            buttonText: 'עריכה'
        },
        {
            title: 'עריכת פרטים אישיים',
            // index: 1,
            buttonText: "אישור",
            formGroup: null,
            element: [
                {
                    title: "שם פרטי",
                    HTMLelement: "input",
                    validName: "fullName",
                },
                {
                    title: "תעודת זהות",
                    HTMLelement: "input",
                    validName: "id",
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
    title: string;
    // index: number;
    buttonText: string;
    element?: iElement[];
    // profile?: iProfile | null;
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

