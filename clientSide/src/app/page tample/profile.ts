export const editProfile: iProfile =
{
    ngSubmit: "editForm",
    buttonText: "עריכה",
    func: () => void {},
    items: [
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
        }
    ]
};

export interface iProfile {
    ngSubmit: string;
    buttonText: string;
    func: () => void;
    items: i[];
}

export interface i {
    title: string,
    HTMLelement: string,
    validName: string,
}
