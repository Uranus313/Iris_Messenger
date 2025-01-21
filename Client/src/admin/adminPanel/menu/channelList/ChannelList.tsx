import { useState } from "react";
import useGetChannelsByAdmin from "../../../../hooks/useGetChannelsByAdmin";
import { Core_api_Link, Media_api_Link } from "../../../../consts/APILink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const ChannelList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  let [channelId, SetChannelId] = useState<string>("");
  const queryClient = useQueryClient();
  const [showError, setShowError] = useState<string | null>();
  const [banLoading, setBanLoading] = useState<boolean>(false);
  const { handleSubmit } = useForm();
  let { data, error, isLoading } = useGetChannelsByAdmin();
  const filteredChannels = data?.data.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const banChannel = useMutation({
    mutationFn: async (channelId: string) => {
      const result = await fetch(
        Core_api_Link + `channels/banChannel/` + `${channelId}`,
        {
          method: "PUT",
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
      setBanLoading(false);
      queryClient.invalidateQueries({ queryKey: ["adminChannels"] });
    },
    onError: (error) => {
      setBanLoading(false);
      setShowError(error.message);
    },
  });
  const handleBan = () => {
    setBanLoading(true);
    if (channelId != "") {
      banChannel.mutate(channelId);
    }
  };
  return (
    <div className="scroll">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <input
        type="text"
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-500 mb-4"
      />
      <p>{error && error?.message}</p>
      {showError && showError}
      <ul className="space-y-4">
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : filteredChannels?.length! > 0 ? (
          filteredChannels?.map((channel) => (
            <li
              key={channel._id}
              className="flex items-center justify-between gap-4 bg-gray-800 p-4 rounded-lg"
            >
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    channel.profilePicture
                      ? Media_api_Link + "file/" + channel.profilePicture
                      : ""
                  }
                  alt={`${channel.name} profile`}
                  className="w-12 h-12 rounded-full object-cover overflow-hidden"
                />
                {/* Channel Name */}
                <div>
                  <p className="font-bold text-white">{channel.name}</p>
                </div>
              </div>
              {/* Ban Button */}
              <form
                onSubmit={
                  banLoading
                    ? (e) => {
                        e.preventDefault();
                      }
                    : handleSubmit(handleBan)
                }
              >
                <button
                  className="btn bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md"
                  onClick={() => SetChannelId(channel._id)}
                >
                  {banLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Ban"
                  )}
                </button>
              </form>
            </li>
          ))
        ) : (
          <div>No Group</div>
        )}
      </ul>
    </div>
  );
};

export default ChannelList;
