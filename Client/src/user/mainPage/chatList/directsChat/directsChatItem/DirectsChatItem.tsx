import { Media_api_Link } from "../../../../../consts/APILink";
import { Direct } from "../../../../../interfaces/interfaces";

interface Props {
  direct: Direct;
}

const DirectsChatItem = ({ direct }: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-base-200">
      {/* Avatar and User Info */}
      <div className="flex items-center">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full">
            <img
              src={Media_api_Link + "file" + direct.user.profilePicture}
              alt={""}
            />
          </div>
        </div>
        <div className="ml-3">
          <h2 className="font-bold text-base-content">{direct.user.firstName}</h2>
        </div>
      </div>
    </div>
  );
};

export default DirectsChatItem;
