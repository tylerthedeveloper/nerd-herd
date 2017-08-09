
export class Post {
    constructor(authorID: string,
                author: string,
                title: string,
                content: string,
                timestamp: string,
                category: string) {}

    picture: string;
    //tags : Tag[]
}


var postButtonsArrayIdConstant = "postCategory_";

/*
export const Category = [
    {
        category: "All", id: postButtonsArrayIdConstant + "All"
    },
    {
        category: "Idea", id: postButtonsArrayIdConstant + "Idea"
    },
    {
        category: "Meetup", id: postButtonsArrayIdConstant + "Meetup"
    },
    {
        category: "News", id: postButtonsArrayIdConstant + "News"
    },
    {
        category: "Project", id: postButtonsArrayIdConstant + "Project"
    },
    {
        category: "Question", id: postButtonsArrayIdConstant + "Question"
    },
]
*/
export const Category = {
    //"All" : postButtonsArrayIdConstant + "All",
    "Idea" : postButtonsArrayIdConstant + "Idea",
    "Meetup" : postButtonsArrayIdConstant + "Meetup",
    "Social" : postButtonsArrayIdConstant + "Social",
    "Question" : postButtonsArrayIdConstant + "Question",
    "Interview Prep" : postButtonsArrayIdConstant + "Interview Prep",
    "Other" : postButtonsArrayIdConstant + "Other"
}
/*
export enum Category {
    Idea,
    Meetup,
    News,
    Project,
    Question,
}

*/