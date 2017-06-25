


export class Post {
    id: number;
    author: string;
    date: string;
    text: string;
    picture: string;
    tags : Category[];

    constructor(author: string) {}
}

enum Category {
    Project,
    News,
    Question,
    Idea,
    Meetup
}
