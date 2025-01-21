import { useState } from "react";
import { Core_api_Link, Media_api_Link } from "../../../../../consts/APILink";
import { Channel } from "../../../../../interfaces/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface Props {
  goBack: () => void;
  channel: Channel;
}

const JoinChannel = ({ goBack, channel }: Props) => {
  const [error, setError] = useState<string | null>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm();
  const joinChannelMutate = useMutation({
    mutationFn: async (channelId: string) => {
      const result = await fetch(
        Core_api_Link + `channels/` + `${channelId}` + `/join`,
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
      goBack();
    },
    onError: (error) => {
      setSubmitLoading(false);
      setError(error.message);
    },
  });
  const handlejoin = () => {
    setSubmitLoading(true);
    joinChannelMutate.mutate(channel._id);
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <button onClick={goBack}>back</button>
      <div className="bg-base-200 shadow-lg rounded-lg w-full max-w-sm p-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-full bg-gray-200 bg-cover bg-center mb-4"
            style={{
              backgroundImage: channel.profilePicture
                ? `url(${Media_api_Link}file/${channel.profilePicture})`
                : "", // Placeholder image
            }}
          ></div>
        </div>

        {/* Profile Information */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary mb-2">
            {channel.name}
          </h2>
          <p className="text-gray-600 mb-4">{channel.name}</p>
          <form
            onSubmit={
              submitLoading
                ? (e) => e.preventDefault()
                : handleSubmit(handlejoin)
            }
          >
            {error && error}
            {/* Submit Button */}
            <button className="btn btn-sm bg-blue-500 text-gray">
              {submitLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinChannel;
