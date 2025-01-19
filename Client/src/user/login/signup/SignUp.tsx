import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IAM_api_Link } from "../../../consts/APILink";
import userContext from "../../../contexts/userContext";

interface Props {
  email: string;
}

const SignUp = ({ email }: Props) => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const { register, handleSubmit } = useForm();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(userContext);
  console.log("testtingggggg");
  const navigate = useNavigate();
  const signUpMutate = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log(localStorage.getItem("Authorization"));
      console.log("test");
      const result = await fetch(IAM_api_Link + `users/signUp`, {
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
    onSuccess: (result, sentData) => {
      console.log(sentData);
      console.log(result);
      setUser(result);
      navigate("/user");
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
    const filteredData: {
      firstName: string;
      lastName?: string | null;
      bio?: string | null;
    } = Object.fromEntries(
      Object.entries(data).filter(([value]) => value !== "")
    ) as { firstName: string; lastName?: string | null; bio?: string | null };
    if (profilePicture) {
      formData.append("file", profilePicture);
    }
    formData.append("data", JSON.stringify({ ...filteredData, email: email }));
    signUpMutate.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-white">
          Create Your Account with signUp@example.com
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Fill out the form below to create your account.
        </p>
      </div>
      {error && error}
      {/* Form */}
      <form
        onSubmit={
          submitLoading ? (e) => e.preventDefault() : handleSubmit(handleSignUp)
        }
        className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md space-y-6"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          {profilePicture ? (
            <img
              src={URL.createObjectURL(profilePicture as Blob)}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-indigo-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          <label className="btn btn-sm btn-outline">
            Upload Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Name
            <input
              type="text"
              {...register("firstName")}
              placeholder="Enter your first name"
              required
              className="input input-bordered w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastName")}
              className="input input-bordered w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bio
            <textarea
              {...register("bio")}
              placeholder="Tell us a bit about yourself"
              className="textarea textarea-bordered w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
            ></textarea>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full bg-indigo-600 text-white hover:bg-indigo-500"
        >
          {submitLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
