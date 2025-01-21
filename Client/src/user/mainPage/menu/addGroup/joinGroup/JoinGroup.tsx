import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Core_api_Link, Media_api_Link } from "../../../../../consts/APILink";
import { Group } from "../../../../../interfaces/interfaces";

interface Props {
  goBack: () => void;
  group: Group;
}

const JoinGroup = ({ goBack, group }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm();

  const joinGroupMutate = useMutation({
    mutationFn: async (groupId: string) => {
      const result = await fetch(`${Core_api_Link}groups/${groupId}/join`, {
        method: "POST",
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
      setSubmitLoading(false);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
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
    joinGroupMutate.mutate(group._id);
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="btn btn-outline btn-sm mb-6 flex items-center gap-2"
      >
        <p className="">B</p> 
      </button>

      {/* Card */}
      <div className="bg-base-200 shadow-lg rounded-lg w-full max-w-sm p-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-full bg-gray-200 bg-cover bg-center mb-4"
            style={{
              backgroundImage: group.profilePicture
                ? `url(${Media_api_Link}file/${group.profilePicture})`
                : "",
            }}
          >
            {!group.profilePicture && (
              <div className="h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Group Information */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary mb-2">{group.name}</h2>
          <p className="text-gray-600 mb-4">
            {group.link || "No link available"}
          </p>

          {/* Form and Submit Button */}
          <form
            onSubmit={
              submitLoading
                ? (e) => e.preventDefault()
                : handleSubmit(handleJoin)
            }
          >
            {error && (
              <p className="text-sm text-red-500 text-center mb-4">{error}</p>
            )}
            <button
              type="submit"
              className={`btn btn-primary w-full ${
                submitLoading ? "btn-disabled" : ""
              }`}
            >
              {submitLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Join Group"
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

export default JoinGroup;
