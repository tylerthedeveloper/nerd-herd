


export class Post {
    constructor(authorID: string,
                author: string,
                title: string,
                content: string,
                timestamp: string) {}

    picture: string;
    tags : Category[];

}

enum Category {
    Project,
    News,
    Question,
    Idea,
    Meetup
}
