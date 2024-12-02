export interface User{
    Id : number;
    Username? : string | null;
    Email : string;
    TwoStepPassword? : string | null;
    IsOnline : boolean;
    LastSeen : string;
    FirstName : string;
    LastName? : string | null;
    Bio? : string | null;
    IsDeleted : boolean;
    IsBanned : boolean;
}

export interface Admin{
    Id : number;
    Password : string;
    Email : string;
    IsOnline : boolean;
    LastSeen : string;
    FirstName : string;
    LastName? : string | null;
    IsDeleted : boolean;
    IsBanned : boolean;
}
