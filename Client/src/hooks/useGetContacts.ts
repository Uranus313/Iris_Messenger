import { useQuery } from "@tanstack/react-query";
import { Core_api_Link } from "../consts/APILink";
import { User } from "../interfaces/interfaces";
function useGetContacts(){
    return useQuery({
        queryKey : ['contacts'],
        queryFn : async () => {
            const result = await fetch(Core_api_Link + "users/contacts", {
                            credentials: "include"
                        });
            const jsonResult  = await result.json();
            if(result.ok){
                return jsonResult as User[]
            }else{
                throw new Error(jsonResult.error);
            }
        },
        staleTime: 6 * 60 * 60 * 1000,
        retry: 3
    })
}
export default useGetContacts;