export interface User{
    id : number;
    username? : string | null;
    email : string;
    twoStepPassword? : string | null;
    profilePicture: string | null | undefined;
    isOnline : boolean;
    lastSeen : string;
    firstName : string;
    lastName? : string | null;
    bio? : string | null;
    phoneNumber: string | null;
    isDeleted : boolean;
    isBanned : boolean;
    status: "user" | "admin" | "superAdmin";
}

export interface Admin{
    id : number;
    password : string;
    email : string;
    isOnline : boolean;
    lastSeen : string;
    firstName : string;
    lastName? : string | null;
    isDeleted : boolean;
    isBanned : boolean;
}

export interface Contact {
    firstUserId : number;
    targetUserId : number;
}


export interface Channel{
    ownerId : number;
    description : string| null;
    name : string;
    link : string;
    type : "private"|"public";
    profilePicture : string|null;
    memberCount:number;
    isDeleted : boolean;
    isBanned : boolean;
    status: "channel"|"group"|"direct"
}
export interface Direct{
    _id: number;
    user : User;
    status: "channel"|"group"|"direct"

}
export interface Group{
    ownerId : number;
    description : string| null;
    name : string;
    link : string;
    type : "private"|"public";
    profilePicture : string|null;
    members : {
        id:number;
        role:"admin"|"owner"|"member";
        memberCount:number;
    }
    isDeleted : boolean;
    isBanned : boolean;
    status: "channel"|"group"|"direct"
}
