import { useQuery } from "@tanstack/react-query";
import { APILink } from "../consts/APILink";
import { User } from "../interfaces/interfaces";
function useUserCheckToken(){
    return useQuery({
        queryKey : ['user'],
        queryFn : async () => {
            const result = await fetch(APILink+"user/", {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem("auth-token")}`
                            },
                            credentials: "include"
                        });
            const jsonResult  = await result.json();
            console.log("teees")
            console.log(jsonResult)
            if(result.ok){
                return jsonResult as User
            }else{
                throw new Error(jsonResult.error);
            }    
        },
        staleTime: 6 * 60 * 60 * 1000,
        //
        retry: 1
    })
}
export default useUserCheckToken;