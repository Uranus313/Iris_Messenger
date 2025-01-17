import { useMutation } from "@tanstack/react-query";
import { FormEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IAM_api_Link } from "../../../consts/APILink";
import { useNavigate } from "react-router-dom";
import userContext from "../../../contexts/userContext";

interface Props{
  goToPreviousStage : () => void,
  email : string
}

const SignUp = ({email , goToPreviousStage} : Props) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const {
    register,
    // setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [error , setError] = useState<string | null>(null);
  const {user,setUser} = useContext(userContext);

  const navigate = useNavigate();
  const signUpMutate = useMutation({
    mutationFn: async (signUpObject : {email : string , firstName : string , lastName? : string | null , bio? : string | null  }) => {
       console.log(localStorage.getItem('Authorization'));
       console.log("test")
        const result = await fetch(IAM_api_Link + `users/signUp`, {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem("auth-token") || ""
            },
            body: JSON.stringify(signUpObject),
      });
      const jsonResult = await result.json();
      localStorage.setItem("auth-token",result.headers.get("auth-token") || "");
    //   console.log(jsonResult)
      if(result.ok){
          return jsonResult;
      }else{
          throw new Error(jsonResult.message);
      }
    },
    onSuccess: ( result,sentData) =>{
        console.log(sentData);
        console.log(result);
        setUser(result);
        navigate("/user");
        // goToNextStage();
        
    },
    onError: (error) =>{
        setError(error.message)  
        setSubmitLoading(false);
    }
}); 
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    }
  };

  const handleSignUp = (data : any) => {
    setSubmitLoading(true);
    const filteredData : {firstName : string , lastName? : string | null , bio? : string | null} = Object.fromEntries( Object.entries(data).filter(([key, value]) => value !== "") ) as {firstName : string , lastName? : string | null , bio? : string | null};
    signUpMutate.mutate({...filteredData, email: email});
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
        onSubmit={submitLoading? (e) => e.preventDefault() : handleSubmit(handleSignUp)}
        className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md space-y-6"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          {profilePicture ? (
            <img
              src={profilePicture}
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
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
          >
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
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
          >
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
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
          >
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
          {submitLoading? <span className="loading loading-spinner loading-md"></span>:"Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
