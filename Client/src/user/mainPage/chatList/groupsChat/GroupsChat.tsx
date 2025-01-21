import useGetGroups from "../../../../hooks/useGetGroups";
import { Channel, Direct, Group } from "../../../../interfaces/interfaces";
import GroupsChatItem from "./groupsChatItem/GroupsChatItem";

interface Props {
  setSelectedChat: (nextState: Group | Channel | Direct | null) => void;
  userGroupsSearched: Group[];
  setSelectedChatStatus: (
    nextState: "group" | "channel" | "direct" | null
  ) => void;
  setSidebarState: (
    nextState:
      | "settings"
      | "contacts"
      | "addGroup"
      | "addChannel"
      | "joinChannel"
      | "joinGroup"
  ) => void;
}

const GroupsChat = ({
  setSelectedChat,
  userGroupsSearched,
  setSelectedChatStatus,
  setSidebarState,
}: Props) => {
  let { data, error, isLoading } = useGetGroups();
  return (
    <div className="w-full max-w-lg bg-base-300 rounded-lg shadow-lg">
      <p>{error?.message}</p>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <div className="divide-y divide-base-200">
          {userGroupsSearched.length > 0 ? (
            userGroupsSearched.map((group, index) => (
              <div
                key={index}
                onClick={() => {
                  setSidebarState("joinGroup");
                  setSelectedChat(group);
                  setSelectedChatStatus(null);
                }}
              >
                <GroupsChatItem key={index} group={group} lastMessage={null} />
              </div>
            ))
          ) : data?.data.length! > 0 ? (
            data?.data.map((groupData, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedChat(groupData.group);
                  setSelectedChatStatus(groupData.group.status);
                }}
              >
                <GroupsChatItem
                  key={index}
                  group={groupData.group}
                  lastMessage={groupData.lastMessage}
                />
              </div>
            ))
          ) : (
            <div>No Groups</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupsChat;
