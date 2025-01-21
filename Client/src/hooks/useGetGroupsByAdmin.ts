import { useQuery } from "@tanstack/react-query";
import { Group } from "../interfaces/interfaces";
import { Core_api_Link } from "../consts/APILink";

function useGetGroupsByAdmin() {
  return useQuery({
    queryKey: ["AdminGroups"],
    queryFn: async () => {
      const result = await fetch(Core_api_Link + "groups/", {
        credentials: "include",
      });
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult as {
          data: Group[];
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
export default useGetGroupsByAdmin;
