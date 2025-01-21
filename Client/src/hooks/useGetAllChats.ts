import { useQuery } from "@tanstack/react-query";
import { Core_api_Link } from "../consts/APILink";
import {
  Channel,
  ChannelMessage,
  Direct,
  DirectMessage,
  Group,
  GroupMessage,
} from "../interfaces/interfaces";

function useGetAllChats() {
  return useQuery({
    queryKey: ["allChats"],
    queryFn: async () => {
      const result = await fetch(Core_api_Link + "users/allConversations", {
        credentials: "include",
      });
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult as {
          data: {
            conversation: Direct | Channel | Group;
            type: "channel" | "group" | "direct";
            lastMessage: ChannelMessage | GroupMessage | DirectMessage;
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
export default useGetAllChats;
