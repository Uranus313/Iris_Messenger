import { useQuery } from "@tanstack/react-query";
import { Core_api_Link } from "../consts/APILink";
import { Direct, DirectMessage } from "../interfaces/interfaces";

function useGetDirects(){
    return useQuery({
        queryKey : ['directs'],
        queryFn : async () => {
            const result = await fetch(Core_api_Link+"directs/my-directs", {
                            credentials: "include"
                        });
            const jsonResult  = await result.json();
            if(result.ok){
                return jsonResult as {data : {direct:Direct,lastMessage:DirectMessage}[],hasMore: boolean}
            }else{
                throw new Error(jsonResult.error);
            }
        },
        staleTime: 6 * 60 * 60 * 1000,
        //
        retry: 1
    })
}
export default useGetDirects;