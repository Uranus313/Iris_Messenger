import { useMutation } from "@tanstack/react-query";
import { FormEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IAM_api_Link } from "../../consts/APILink"
import { useNavigate } from "react-router-dom";
import userContext from "../../contexts/userContext";



const AdminLogIn = () => {
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
  const logInMutate = useMutation({
    mutationFn: async (logInObject : any) => {
       console.log(localStorage.getItem('Authorization'));
       console.log("test")
        const result = await fetch(IAM_api_Link + `admins/logIn`, {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem("auth-token") || ""
            },
            body: JSON.stringify(logInObject),
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
        setSubmitLoading(false);
        setUser(result)
        navigate("/admin/");
        // goToNextStage();
        
    },
    onError: (error) =>{
        setError(error.message)  
        setSubmitLoading(false);
    }
}); 

  const handleAdminLogIn = (data : any) => {
    setSubmitLoading(true);
    logInMutate.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
          Admin Login
        </h1>

        {/* Login Form */}
        <form onSubmit={submitLoading ?(e)=> e.preventDefault() : handleSubmit(handleAdminLogIn)} className="space-y-6">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Email Address</span>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full text-black"
              {...register("email")}
              required
            />
            </label>

          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full text-black"
              {...register("password")}
              required
            />
          </label>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-warning w-full"
          >
            Login
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-center text-red-500">{error}</div>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          For Admin use only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogIn;

