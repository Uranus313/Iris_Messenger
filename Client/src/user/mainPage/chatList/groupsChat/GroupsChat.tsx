import useGetGroups from "../../../../hooks/useGetGroups";
import GroupsChatItem from "./groupsChatItem/GroupsChatItem";

const GroupsChat = () => {
  let { data, error, isLoading } = useGetGroups();
  return (
    <div className="w-full max-w-lg bg-base-300 rounded-lg shadow-lg">
      <p>{error?.message}</p>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <div className="divide-y divide-base-200">
          {data?.data?.length! > 0 ? (
            data?.data?.map((group, index) => (
              <GroupsChatItem key={index} group={group} />
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
