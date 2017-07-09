


export class User {
    constructor(public uid: string,
                public name: string,
                public email: string,
                public gitUsername: string,
                private photoUrl: string) {}
    
    school: string;
    job: string;
    proPic: string;

    //activity info
    followers: number;
    posts: number;
}