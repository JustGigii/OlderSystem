import { FormGroup } from "@angular/forms";

export const ProfilePattern: iProfilePattern =
{
    profile: [],
    profileTitle: ['שם מלא', 'תעודת זהות', 'אימייל', 'מספר טלפון'],
    pages:
        [{
            index: 0,
            title: 'הפרופיל שלי',
            buttonText: 'עריכה'
        },
        {
            title: 'עריכת פרטים אישיים',
            index: 1,
            buttonText: "אישור",
            formGroup: null,
            element: [
                {
                    title: "שם פרטי",
                    HTMLelement: "input",
                    validName: "name",
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

export interface iPages {
    title: string;
    index: number;
    buttonText: string;
    element?: iElement[];
    // profile?: iProfile | null;
    formGroup?: FormGroup | null;
}

export interface iProfilePattern {
    profile: iProfile[];
    profileTitle: any[];
    pages: iPages[];
}

export interface iElement {
    title: string,
    text?: string
    HTMLelement?: string,
    validName?: string,
}
export interface iProfile {
    fullName: string,
    ID: string
    Email: string,
    phoneNumber: string,
}
//גיגי
export interface UserDetails
{
    userId:number,
    fullName:string,
    id:string,
    email:string,
    phoneNumber:string,
    manageRole: number,
}
export interface CreateUserDetails
{
    fullName:string,
    id:string,
    email:string,
    phoneNumber:string,
    manageRole: number,
}

