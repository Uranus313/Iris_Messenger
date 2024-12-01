import { createContext } from "react";
import { User } from "../interfaces/interfaces";

interface userContextType {
    user: User | undefined | null;
    setUser: React.Dispatch<React.SetStateAction<User | undefined | null>>;
    isLoading: boolean | undefined | null;
}

let userContext = createContext<userContextType>({} as userContextType);

export default userContext;