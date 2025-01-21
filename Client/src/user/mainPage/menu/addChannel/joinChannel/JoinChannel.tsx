import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Core_api_Link, Media_api_Link } from "../../../../../consts/APILink";
import { Channel } from "../../../../../interfaces/interfaces";

interface Props {
  goBack: () => void;
  channel: Channel;
}

const JoinChannel = ({ goBack, channel }: Props) => {
  const [error, setError] = useState<string | null>(null);
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
    onError: (error: any) => {
      setSubmitLoading(false);
      setError(error.message);
    },
  });

  const handleJoin = () => {
    setSubmitLoading(true);
    joinChannelMutate.mutate(channel._id);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="bg-base-200 shadow-lg rounded-lg w-full max-w-md p-6">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="btn btn-sm btn-outline mb-4 flex items-center"
        >
          <p className="mr-2">B</p> 
        </button>

        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-full bg-gray-200 bg-cover bg-center mb-4"
            style={{
              backgroundImage: channel.profilePicture
                ? `url(${Media_api_Link}file/${channel.profilePicture})`
                : "",
            }}
          >
            {!channel.profilePicture && (
              <div className="h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Channel Information */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary mb-2">
            {channel.name}
          </h2>
          <p className="text-gray-600 mb-4">
            {channel.description || "No description available"}
          </p>

          {/* Form Submission */}
          <form
            onSubmit={
              submitLoading
                ? (e) => e.preventDefault()
                : handleSubmit(handleJoin)
            }
            className="space-y-4"
          >
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full ${
                submitLoading && "btn-disabled"
              }`}
            >
              {submitLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Join Channel"
              )}
            </button>
          </form>
          <p className="text-sm text-base-300 mt-4">
            Up dated 10 .4 Septembe r29, 20 24Improvedstructure
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinChannel;
