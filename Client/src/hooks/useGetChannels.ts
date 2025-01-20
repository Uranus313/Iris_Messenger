import { useQuery } from "@tanstack/react-query";
import { Core_api_Link } from "../consts/APILink";
import { Channel } from "../interfaces/interfaces";
function useGetChannels(){
    return useQuery({
        queryKey : ['channels'],
        queryFn : async () => {
            const result = await fetch(Core_api_Link+"channels/my-channels", {
                            credentials: "include"
                        });
            const jsonResult  = await result.json();
            if(result.ok){
                return jsonResult as {data :Channel[],hasMore: boolean}
            }else{
                throw new Error(jsonResult.error);
            }
        },
        staleTime: 6 * 60 * 60 * 1000,
        //
        retry: 3
    })
}
export default useGetChannels;