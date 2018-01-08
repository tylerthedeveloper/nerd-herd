export class Follower {
    
    constructor(public followid: string,
                public followerid: string) {}

}

export interface FollowerFriend {
    id: string;
    name: string;
    photoUrl: string;
}