export interface User{
    id : number;
    username? : string | null;
    email : string;
    twoStepPassword? : string | null;
    isOnline : boolean;
    lastSeen : string;
    firstName : string;
    lastName? : string | null;
    bio? : string | null;
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
