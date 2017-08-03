
export class Post {
    constructor(authorID: string,
                author: string,
                title: string,
                content: string,
                timestamp: string,
                category: Category) {}

    picture: string;
    //tags : Tag[]
}

export enum Category {
    Project,
    News,
    Question,
    Idea,
    Meetup
}

