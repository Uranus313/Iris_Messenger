import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IAM_api_Link, Media_api_Link } from "../../../../../consts/APILink";
import userContext from "../../../../../contexts/userContext";

interface Props {
  goBack: () => void;
}

const Editprofile = ({ goBack }: Props) => {
  const { user, setUser } = useContext(userContext);
  const [error, setError] = useState<string | null>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberPattern = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
      setError("Please enter a valid phone number");
      return false;
    }
    setError(null);
    return true;
  };
  const { register, handleSubmit } = useForm();
  const editProfilePictureMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await fetch(IAM_api_Link + `users/updateProfilePicture`, {
        method: "PUT",
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
    onSuccess: (result) => {
      console.log(result);
      setUser(result);
      setProfileLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setProfileLoading(false);
    },
  });
  const editprofileMutate = useMutation({
    mutationFn: async (data: {
      firstName?: string;
      lastName?: string;
      username?: string;
      bio?: string;
    }) => {
      const result = await fetch(IAM_api_Link + `users/updateProfilePictur`, {
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
  const deleteProfileMutate = useMutation({
    mutationFn: async () => {
      const result = await fetch(IAM_api_Link + `users/deleteProfilePicture`, {
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
    onSuccess: (result) => {
      setProfileLoading(false);
      setUser(result);
    },
    onError: (error) => {
      setProfileLoading(false);
      setError(error.message);
    },
  });
  const handleImageDelete = () => {
    setProfileLoading(true);
    deleteProfileMutate.mutate();
  };

  const handleImageUpload = (e: any) => {
    setProfileLoading(true);
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      editProfilePictureMutation.mutate(formData);
    }
  };
  const handleEdit = (data: any) => {
    setSubmitLoading(true);
    console.log(user);
    for (const key in data) {
      data[key] = data[key].trim();
      if (user?.hasOwnProperty(key)) {
        if (data[key] == "") {
          data[key] = null;
        }
        if (key == "phoneNumber") {
          if (!validatePhoneNumber(data[key])) {
            setSubmitLoading(false);
            return;
          }
        }
        if (data[key] == user[key as keyof typeof user]) {
          delete data[key];
        }
      }
    }
    editprofileMutate.mutate(data);
  };
  return (
    <div className="bg-base-300 flex items-center justify-center min-h-screen w-full md:block">
      <div className=" p-4 bg-base-300 rounded-lg shadow-lg">
        {/* Header */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex items-center mb-6">
          {/* Back Icon */}
          <button
            onClick={goBack}
            className="btn btn-ghost bg-white text-gray-800 me-3 text-lg"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          {/* Title */}
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
        </div>

        <div className="mt-6">
          {/* Profile Picture */}
          <div className="flex flex-col  items-center">
            <div className="relative w-20 h-20">
              {user?.profilePicture ? (
                <img
                  src={Media_api_Link + "file/" + user.profilePicture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full bg-gray-700 mb-4 flex items-center justify-center"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center text-white text-sm"
              >
                +
                <input
                  accept="image/*"
                  onChange={
                    profileLoading
                      ? (e) => e.preventDefault()
                      : handleImageUpload
                  }
                  id="profile-pic"
                  type="file"
                  className="hidden"
                />
              </label>
              <button
                onClick={
                  profileLoading ? (e) => e.preventDefault() : handleImageDelete
                }
                className="absolute bottom-0 right-13 w-6 h-6 bg-red-500 rounded-full cursor-pointer flex items-center justify-center text-white text-sm"
              >
                -
              </button>
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
            <label className="block mt-4 text-sm font-medium text-gray-400">
              Name
            </label>
            <input
              defaultValue={user?.firstName}
              type="text"
              placeholder="Name"
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

            {/* PhoneNumber Input */}
            <label className="block mt-4 text-sm font-medium text-gray-400">
              PhoneNumber (optional)
            </label>
            <input
              type="text"
              defaultValue={user?.phoneNumber || ""}
              {...register("phoneNumber")}
              placeholder="PhoneNumber"
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

            {/* Save Button */}
            <div className="mt-4">
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
        <p className=" text-sm text-base-300">
          Updated 10.4 September 29, 2024 Improved structure
        </p>
      </div>
    </div>
  );
};

export default Editprofile;
