

export interface ihomePage{
    title: string;
    draftIcon: string;
    items: iolderItem[];
}

export interface iolderItem{
    title: string;
    olderId: string;
    date: string;
    type: string;
    status: number;
    currentState: string;
    statusMassage : string;
    products: iproduct[];
}

interface iproduct{
    name: string;
    image: string;
    size: Record<string,number>;
    totalProduct : number;
}

export const homepage: ihomePage = {
    title : "הזמנה",
    draftIcon : "darftEmpty.svg",
    items : [
        {
            title: " ביסה”ת שיכבת יד",
            olderId :"1",
            date: "3.8.2022",
            type : "בלאי",
            status: 3,
            statusMassage: "",
            currentState : 'close',
            products :
            [
                {
                    name: "חולצה א’ בנות",
                    image: "shirt.svg",
                    size : {"ק":6, "ב" :5 , "ג":7},
                    totalProduct : 18
                }
            ]
        },
        {
            title: "דן אתה מרוצה עכשיו?",
            olderId :"1",
            date: "2.8.2022",
            type : "בלאי",
            status: 2,
            statusMassage: "",
            currentState : 'close',
            products :
            [
                {
                    name: "חולצה א’ בנות",
                    image: "shirt.svg",
                    size : {"ק":6, "ב" :5 , "ג":7},
                    totalProduct : 18
                }
            ]
        },
        {
            title: "דן אתה מרוצה עכשיו?",
            olderId :"1",
            date: "2.8.2022",
            type : "בלאי",
            status: 2,
            statusMassage: "",
            currentState : 'close',
            products :
            [
                {
                    name: "חולצה א’ בנות",
                    image: "shirt.svg",
                    size : {"ק":6, "ב" :5 , "ג":7},
                    totalProduct : 18
                }
            ]
        },
        {
            title: "דן אתה מרוצה עכשיו?",
            olderId :"1",
            date: "2.8.2022",
            type : "בלאי",
            status: 2,
            statusMassage: "",
            currentState : 'close',
            products :
            [
                {
                    name: "חולצה א’ בנות",
                    image: "shirt.svg",
                    size : {"ק":6, "ב" :5 , "ג":7},
                    totalProduct : 18
                }
            ]
        }
    ]


    
}
    