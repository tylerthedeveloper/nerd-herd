import { Post, Project } from '../_models/index';


export class User {
    constructor(public uid: string,
                public name: string,
                public email: string,
                public gitUsername: string,
                private photoUrl: string) {}


    public location : any = {
        "latitude" :  "",
        "longitude" : ""
    };
        
    //public projects: Post[]
    school: string;
    job: string;
    proPic: string;

    //activity info
    // posts: Post[]
    followers: number;
}