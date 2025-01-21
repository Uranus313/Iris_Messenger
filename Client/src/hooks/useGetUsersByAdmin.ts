import { useQuery } from "@tanstack/react-query";
import { User } from "../interfaces/interfaces";
import { IAM_api_Link } from "../consts/APILink";

function useGetUsersByAdmin() {
  return useQuery({
    queryKey: ["AdminUsers"],
    queryFn: async () => {
      const result = await fetch(IAM_api_Link + "users/getAllUsers", {
        credentials: "include",
      });
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult as User[];
      } else {
        throw new Error(jsonResult.error);
      }
    },
    staleTime: 6 * 60 * 60 * 1000,
    //
    retry: 1,
  });
}
export default useGetUsersByAdmin;
