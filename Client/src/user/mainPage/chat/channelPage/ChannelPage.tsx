import { useContext, useState } from "react";
import sth from "../../../../assets/Background.png";
import { Core_api_Link, Media_api_Link } from "../../../../consts/APILink";
import { Channel } from "../../../../interfaces/interfaces";
import ChannelMember from "./channelMember/ChannelMember";
import userContext from "../../../../contexts/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface Props {
  showChatList: () => void;
  channel: Channel;
}

const ChannelPage = ({ showChatList, channel }: Props) => {
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
  const { user } = useContext(userContext);
  const [error, setError] = useState<string | null>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm();
  const toggleRightMenu = () => {
    setIsRightMenuOpen(!isRightMenuOpen);
  };
  const leaveChannel = useMutation({
    mutationFn: async (channelId: string) => {
      const result = await fetch(
        Core_api_Link + `channels/` + `${channelId}` + `/leave`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult;
      } else {
        throw new Error(jsonResult.message);
      }
    },
    onSuccess: () => {
      setSubmitLoading(false);
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      queryClient.invalidateQueries({ queryKey: ["allChats"] });
      showChatList();
    },
    onError: (error) => {
      setSubmitLoading(false);
      setError(error.message);
    },
  });
  const handleLeave = () => {
    setSubmitLoading(true);
    leaveChannel.mutate(channel._id);
  };
  const deleteChannel = useMutation({
    mutationFn: async (channelId: string) => {
      const result = await fetch(Core_api_Link + `channels/` + `${channelId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult;
      } else {
        throw new Error(jsonResult.message);
      }
    },
    onSuccess: () => {
      setDeleteLoading(false);
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      queryClient.invalidateQueries({ queryKey: ["allChats"] });
      showChatList();
    },
    onError: (error) => {
      setDeleteLoading(false);
      setError(error.message);
    },
  });
  const handleDletet = () => {
    setDeleteLoading(true);
    deleteChannel.mutate(channel._id);
  };
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${sth})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-base-200">
        <button className="block md:hidden p-2" onClick={showChatList}>
          back
        </button>
        <button onClick={toggleRightMenu}>
          <div className="flex items-center">
            <div className="avatar mr-3">
              <div className="w-10 rounded-full">
                <img
                  src={
                    channel.profilePicture
                      ? Media_api_Link + "file/" + channel.profilePicture
                      : ""
                  }
                  alt="User"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">{channel.name}</h1>
              <p className="text-xs text-gray-400">
                members {" " + channel.memberCount}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Right Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-base-200 shadow-lg transform ${
          isRightMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <button
            onClick={toggleRightMenu}
            className="btn btn-circle btn-sm btn-ghost mb-4"
          >
            ✕
          </button>
          <h2 className="text-lg font-bold mb-4">Menu</h2>
          <div className="flex flex-col w-full  h-screen bg-base-200 shadow-lg relative">
            {/* User Avatar and Name */}
            <div className="p-4 flex flex-col">
              <div className="avatar">
                <div className="w-56 h-52 rounded-md ">
                  <img
                    className=""
                    src={
                      channel.profilePicture
                        ? Media_api_Link + "file/" + channel.profilePicture
                        : ""
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="">
                <h2 className="mt-5 text-xl font-bold text-base-content">
                  {channel.name}
                </h2>
                <div className="w-full flex gap-2">
                  <p className="text-sm w-full text-gray-500 ">members </p>
                  <p className="text-sm w-full text-gray-500">
                    {channel.memberCount}
                  </p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 space-y-4 ">
              {/* Phone */}
              <div className="flex items-center">
                <i className="fas fa-phone text-xl text-gray-500"></i>
                <div className="">
                  <p className="text-sm text-gray-500">{channel.link}</p>
                  <p className="text-base-content font-medium">Link</p>
                </div>
              </div>
              {/* Bio */}
              <div className="flex items-center">
                <i className="fas fa-info-circle text-xl text-gray-500"></i>
                <div className="">
                  <p className="text-base-content font-medium text-ellipsis overflow-hidden w-fit">
                    {channel.description}
                  </p>
                  <p className="text-sm text-gray-500">Description</p>
                </div>
              </div>
            </div>
            <div className="flex  w-full ml-4">
              <form
                onSubmit={
                  submitLoading
                    ? (e) => e.preventDefault()
                    : handleSubmit(handleLeave)
                }
                className=""
              >
                <button className="btn btn-sm bg-red-500 text-gray">
                  {submitLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Leave"
                  )}
                </button>
              </form>
              {user?.id == channel.ownerId && (
                <form
                  onSubmit={
                    deleteLoading
                      ? (e) => e.preventDefault()
                      : handleSubmit(handleDletet)
                  }
                  className=""
                >
                  <button className="btn btn-sm bg-red-500 text-gray">
                    {deleteLoading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </form>
              )}

              {error && error}
            </div>
            {user?.id == channel.ownerId && <ChannelMember channel={channel} />}
          </div>
        </div>
      </div>
      {/* Input Field */}
      {user?.id == channel.ownerId && (
        <div className="flex items-center bg-base-200 p-4">
          <button className="btn btn-ghost btn-circle mr-2">
            <i className="fas fa-smile"></i>
          </button>
          <input
            type="text"
            placeholder="Message"
            className="input input-bordered flex-1"
          />
          <button className="btn btn-ghost btn-circle ml-2">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
