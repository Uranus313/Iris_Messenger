import { useQuery } from "@tanstack/react-query";
import { Core_api_Link } from "../consts/APILink";
import { User } from "../interfaces/interfaces";
function useGetGroupMembers(groupId: string) {
  return useQuery({
    queryKey: ["groupMembers", groupId],
    queryFn: async () => {
      const result = await fetch(
        Core_api_Link + "groups/" + `${groupId}` + "/users",
        {
          credentials: "include",
        }
      );
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult as {
          data: { user: User; role: string; joinedAt: Date }[];
          hasMore: boolean;
        };
      } else {
        throw new Error(jsonResult.error);
      }
    },
    staleTime: 6 * 60 * 60 * 1000,
    retry: 1,
  });
}
export default useGetGroupMembers;
