import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Core_api_Link } from "../../../../consts/APILink";

interface Props {
  goBack: () => void;
}

const AddChannel = ({ goBack }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const addChannelMutate = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await fetch(Core_api_Link + `channels/`, {
        method: "POST",
        credentials: "include",
        body: formData,
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
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      goBack();
    },
    onError: (error) => {
      setError(error.message);
      setSubmitLoading(false);
    },
  });

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSignUp = (data: any) => {
    setSubmitLoading(true);
    const formData = new FormData();
    for (const key in data) {
      data[key] = data[key].trim();
      if (data[key] == "") {
        delete data[key];
      }
    }
    console.log(data);
    data.type = "public";
    if (profilePicture) {
      formData.append("file", profilePicture);
    }
    formData.append("data", JSON.stringify({ ...data }));
    console.log(data);
    addChannelMutate.mutate(formData);
  };

  
  return (
    <div className="min-h-screen bg-base-300 text-base-content flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-base-100 shadow-md">
        <button onClick={goBack} className="btn btn-ghost btn-sm mr-4">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-bold">New Channel</h1>
      </div>
      {error && error}
      <form
        onSubmit={
          submitLoading ? (e) => e.preventDefault() : handleSubmit(handleSignUp)
        }
      >
        {/* Channel Icon and Info */}
        <div className="flex flex-col items-center mt-6 px-4">
          {/* Channel Icon */}
          <div className="mb-4">
            {profilePicture ? (
              <img className="w-24 h-24 rounded-full" src={URL.createObjectURL(profilePicture as Blob)} alt="" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-content"></div>
            )}

            <label className="btn btn-sm btn-outline mt-3 mr-3">
              Upload Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Channel Name */}
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Channel name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Channel name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Channel Link</span>
            </label>
            <input
              type="text"
              {...register("link")}
              placeholder="Channel Link"
              className="input input-bordered w-full"
            />
          </div>
          {/* Channel Description */}
          <div className="form-control w-full max-w-md mt-4">
            <label className="label">
              <span className="label-text">Description (optional)</span>
            </label>
            <textarea
              {...register("description")}
              placeholder="Description (optional)"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full bg-indigo-600 text-white hover:bg-indigo-500 mt-5"
          >
            {submitLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Submit"
            )}
          </button>
          {/* Hint */}
          <p className="text-sm text-gray-500 mt-2 max-w-md text-center">
            You can provide optional description for your channel.
          </p>
        </div>
        <p className=" text-sm text-base-300">
          Up dated 10 . 4 Sep tem ber 29 , 20 24 Imp roved struc ture
        </p>
      </form>
    </div>
  );
};

export default AddChannel;
