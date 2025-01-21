import { useQuery } from "@tanstack/react-query";
import { Core_api_Link } from "../consts/APILink";
import { Group, GroupMessage } from "../interfaces/interfaces";
function useGetGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const result = await fetch(Core_api_Link + "groups/my-groups", {
        credentials: "include",
      });
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult as {
          data: {
            group: Group;
            role: string;
            joinedAt: Date;
            lastMessage: GroupMessage;
          }[];
          hasMore: boolean;
        };
      } else {
        throw new Error(jsonResult.error);
      }
    },
    staleTime: 6 * 60 * 60 * 1000,
    //
    retry: 1,
  });
}
export default useGetGroups;
