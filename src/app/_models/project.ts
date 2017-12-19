
export class Project {
    
    id: number;
    author: string;
    date: string;
    text: string;
    picture: string;
    category: string;
    //tags : Category[];
}

var projectButtonsArrayIdConstant = "projectCategory_";

export const ProjectCategory = {
    //"All" : postButtonsArrayIdConstant + "All",
    "School" : projectButtonsArrayIdConstant + "School",
    "Personal" : projectButtonsArrayIdConstant + "Personal",
    "Buisness" : projectButtonsArrayIdConstant + "Business",
    "Idea" : projectButtonsArrayIdConstant + "Idea",
    "Other" : projectButtonsArrayIdConstant + "Other"
};

/*
enum Category {
    School,
    Personal,
    Business,
    Idea,
    Other
};
*/