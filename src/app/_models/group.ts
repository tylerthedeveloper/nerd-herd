import { User } from './user';

export class Group {
    constructor(name: string,
                creator: string,
                pictureUrl: string,
                groupCategory: GroupCategory) {}

    memberCount: number;
    members: User[];

    public increaseMemberCount = () => {
        this.memberCount += 1;
    }
}

export enum GroupCategory {
    Learning,
    Development,
    Other
}

