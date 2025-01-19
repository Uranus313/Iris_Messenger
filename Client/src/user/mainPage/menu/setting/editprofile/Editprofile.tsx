import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IAM_api_Link } from "../../../../../consts/APILink";
import userContext from "../../../../../contexts/userContext";

interface Props {
  goBack: () => void;
}

const Editprofile = ({ goBack }: Props) => {
  const { user, setUser } = useContext(userContext);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();
  const editprofileMutate = useMutation({
    mutationFn: async (data: {
      firstName?: string;
      lastName?: string;
      username?: string;
      bio?: string;
    }) => {
      const result = await fetch(IAM_api_Link + `users/editUser`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult;
      } else {
        throw new Error(jsonResult.message);
      }
    },
    onSuccess: (result) => {
      setSubmitLoading(false);
      setUser(result);
    },
    onError: (error) => {
      setSubmitLoading(false);
      setError(error.message);
    },
  });

  const handleEdit = (data: any) => {
    setSubmitLoading(true);
    console.log(user);
    for (const key in data) {
      data[key] = data[key].trim();
      if (user?.hasOwnProperty(key)) {
        // console.log(`Key: ${key}, Value: ${data[key]}`);
        // Perform your action here for each key
        if (data[key] == "") {
          data[key] = null;
        }
        if (data[key] == user[key as keyof typeof user]) {
          delete data[key];
        }
      }
    }
    editprofileMutate.mutate(data);
  };
  return (
    <div className=" bg-gray-900 flex items-center justify-center">
      <div className="w-full  p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Header */}
        {error && error}
        <div className="flex items-center  mb-6">
          {/* Back Icon */}
          <button
            onClick={goBack}
            className="btn bg-white me-3 btn-ghost text-lg text-white"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          {/* Title */}
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
        </div>

        <div className="mt-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">+</span>
              </div>
              <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center text-white text-sm"
              >
                +
                <input id="profile-pic" type="file" className="hidden" />
              </label>
            </div>
          </div>
          <form
            onSubmit={
              submitLoading
                ? (e) => {
                    e.preventDefault();
                  }
                : handleSubmit(handleEdit)
            }
          >
            {/* Name Input */}
            <label className="block mt-6 text-sm font-medium text-gray-400">
              Name
            </label>
            <input
              defaultValue={user?.firstName}
              type="text"
              placeholder="Name"
              onSubmit={() => {
                console.log("test");
              }}
              {...register("firstName")}
              className="w-full mt-1 input input-bordered bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-blue-500"
            />

            {/* Last Name Input */}
            <label className="block mt-4 text-sm font-medium text-gray-400">
              Last Name
            </label>
            <input
              defaultValue={user?.lastName || ""}
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              className="w-full mt-1 input input-bordered bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-blue-500"
            />

            {/* Bio Input */}
            <label className="block mt-4 text-sm font-medium text-gray-400">
              Bio (optional)
            </label>
            <textarea
              defaultValue={user?.bio || ""}
              {...register("bio")}
              placeholder="Any details such as age, occupation, or city"
              className="w-full mt-1 textarea textarea-bordered bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-blue-500"
            />

            {/* Username Input */}
            <label className="block mt-4 text-sm font-medium text-gray-400">
              Username
            </label>
            <input
              defaultValue={user?.username || ""}
              type="text"
              {...register("username")}
              placeholder="Username (optional)"
              className="w-full mt-1 input input-bordered bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-blue-500"
            />
            <p className="mt-2 text-xs text-gray-500">
              You can choose a username on Telegram. If you do, people will be
              able to find you by this username and contact you without needing
              your phone number.
            </p>

            {/* Save Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 text-white"
              >
                {submitLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
