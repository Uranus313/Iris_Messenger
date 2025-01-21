import { Media_api_Link } from "../../../../../consts/APILink";
import { Group, GroupMessage } from "../../../../../interfaces/interfaces";

interface Props {
  group: Group;
  lastMessage: GroupMessage | null;
}

const GroupsChatItem = ({ group, lastMessage }: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-base-200">
      {/* Avatar and User Info */}
      <div className="flex items-center">
        <div className=" rounded-full">
          <div className="w-12 h-12 rounded-full">
            <img
              className=" rounded-full w-12 h-12 "
              src={
                group.profilePicture
                  ? Media_api_Link + "file/" + group.profilePicture
                  : ""
              }
              alt={""}
            />
          </div>
        </div>
        <div className="ml-3">
          <h2 className="font-bold text-base-content">{group.name}</h2>
          <p className="text-sm">{lastMessage?.text}</p>
        </div>
      </div>
    </div>
  );
};

export default GroupsChatItem;
