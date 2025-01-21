import { Media_api_Link } from "../../../../../consts/APILink";
import useGetChannelMembers from "../../../../../hooks/useGetChannelMembers";
import { Channel } from "../../../../../interfaces/interfaces";

interface Props {
  channel: Channel;
}

const ChannelMember = ({ channel }: Props) => {
  let { data, error, isLoading } = useGetChannelMembers(channel._id);
  return (
    <>
      <p>{error?.message}</p>
      {isLoading && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      {data?.data.length! > 0 &&
        data?.data.map((userData, index) => (
          <div key={index} className="flex-1 overflow-scroll px-4 py-2">
            <div className="flex items-center justify-between py-3 border-b border-base-200">
              <div className="flex items-center p-3 justify-between">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img
                      src={
                        userData.user.profilePicture
                          ? Media_api_Link +
                            "file/" +
                            userData.user.profilePicture
                          : ""
                      } // Replace with the member avatar
                      alt=""
                    />
                  </div>
                </div>
                <div className="ml-3 text-xs">
                  <p className="text-xs font-medium">
                    {userData.user.firstName}
                  </p>
                  <p className="text-xs text-gray-500">{userData.role}</p>
                </div>
                <span className="text-xs text-gray-400 ms-6"></span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default ChannelMember;
