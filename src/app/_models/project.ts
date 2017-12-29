
export class Project {
    
    id: number;
    gitID: number;
    author: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    text: string;
    category: string;
    html_url: string;
    language: string;
    
    //not git
    picture: string;
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

export const Language = {
    "C++" : "C++", 
    "Java" : "Java",
    "C#" : "C#", 
    "HTML/CSS" : "HTML/CSS", 
    "JavaScipt" : "JavaScipt", 
    "Python": "Python",
    "Angular": "Angular",
    "Other": "Other"
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
