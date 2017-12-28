
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
    
    gitInfo = {
        "username" : "",
        "avatar_url" : "",
        "repos_url" : "",
        "company" : "",
        "blog" : "",
        "bio" : ""
    };
    
    school: string;
    job: string;
    //    proPic: string;
    
    //activity info
    // posts: Post[]
    //public projects: Post[]
    //followers: number;
}

