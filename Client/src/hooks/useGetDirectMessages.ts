import { useQuery } from "@tanstack/react-query";
import { Core_api_Link } from "../consts/APILink";
import { Message } from "../interfaces/interfaces";
function useGetDirectMessages() {
  return useQuery({
    queryKey: ["directMessages"],
    queryFn: async () => {
      const result = await fetch(Core_api_Link + "users/contacts", {
        credentials: "include",
      });
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult as { data: Message[]; hasMore: boolean };
      } else {
        throw new Error(jsonResult.error);
      }
    },
    staleTime: 6 * 60 * 60 * 1000,
    retry: 1,
  });
}
export default useGetDirectMessages;
