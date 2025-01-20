import useGetGroups from "../../../../hooks/useGetGroups";
import { Channel, Direct, Group } from "../../../../interfaces/interfaces";
import GroupsChatItem from "./groupsChatItem/GroupsChatItem";

interface Props {
  setSelectedChat: (nextState: Group | Channel | Direct | null) => void;
}

const GroupsChat = ({ setSelectedChat }: Props) => {
  let { data, error, isLoading } = useGetGroups();
  return (
    <div className="w-full max-w-lg bg-base-300 rounded-lg shadow-lg">
      <p>{error?.message}</p>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <div className="divide-y divide-base-200">
          {data?.data.length! > 0 ? (
            data?.data?.map((groupData, index) => (
              <div key={index} onClick={() => setSelectedChat(groupData.group)}>
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
