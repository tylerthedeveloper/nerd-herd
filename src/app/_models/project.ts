


export class Project {
    id: number;
    author: string;
    date: string;
    text: string;
    picture: string;
    //tags : Category[];

    //constructor(author: string) {}
}

var postButtonsArrayIdConstant = "projectCategory_";

export const ProjectCategory = {
    //"All" : postButtonsArrayIdConstant + "All",
    "Idea" : postButtonsArrayIdConstant + "Idea",
    "Meetup" : postButtonsArrayIdConstant + "Meetup",
    "Social" : postButtonsArrayIdConstant + "Social",
    "Question" : postButtonsArrayIdConstant + "Question",
    "Interview Prep" : postButtonsArrayIdConstant + "Interview Prep",
    "Other" : postButtonsArrayIdConstant + "Other"
}