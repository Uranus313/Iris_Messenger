import { Media_api_Link } from "../../../../../consts/APILink";
import { Direct, DirectMessage } from "../../../../../interfaces/interfaces";

interface Props {
  direct: Direct;
  lastMessage: DirectMessage;
}

const DirectsChatItem = ({ direct, lastMessage }: Props) => {
  console.log(direct, lastMessage);
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-base-200">
      {/* Avatar and User Info */}
      <div className="flex items-center">
        <div className=" rounded-full">
          <div className="w-12 h-12 rounded-full">
            <img
              className=" rounded-full"
              src={
                direct.user.profilePicture
                  ? Media_api_Link + "file/" + direct.user.profilePicture
                  : ""
              }
              alt={""}
            />
          </div>
        </div>
        <div className="ml-3">
          <h2 className="font-bold text-base-content">
            {direct.user.firstName}
          </h2>
          <p className="text-sm">{lastMessage.text}</p>
        </div>
      </div>
    </div>
  );
};

export default DirectsChatItem;
