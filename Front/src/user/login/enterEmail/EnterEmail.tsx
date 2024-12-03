import { useMutation } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import { IAM_api_Link } from "../../../consts/APILink";



interface Props{
  goToNextStage : () => void,
  setEmail : (email :string) => void;
}

const EnterEmail = ({goToNextStage , setEmail } : Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [error , setError] = useState<string | null>(null);
  const emailMutate = useMutation({
    mutationFn: async (emailObject : {email : string }) => {
       
        const result = await fetch(IAM_api_Link + `authentication/CreateOTP`, {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localStorage.getItem("Authorization")}`
            },
            body: JSON.stringify(emailObject),
      });
      const jsonResult = await result.json();
      setEmail(emailObject.email)

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
        goToNextStage();
    },
    onError: (error) =>{
        setError(error.message)  
        setSubmitLoading(false);
    }
}); 

  const handleEmailSend = (e: FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    console.log("test email")
    if(!emailRef.current?.value){
      return;
    }
    emailMutate.mutate({email : emailRef.current?.value });

  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-6 py-12">
      {/* Logo */}
      <div className="text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKLN_N2k8kVRsrwiXcdPuOx2Zothe2YfAz3w&s"
          alt="Telegram Logo"
          className="w-40  h-40 mx-auto mb-4 rounded-full"
        />
        <h1 className="text-2xl font-bold text-white">Sign in to Telegram</h1>
        <p className="text-sm text-gray-400 mt-2">
          Please enter your email address to log in.
        </p>
      </div>
        {error && error}
      {/* Form */}
      <form
        onSubmit={ submitLoading? (e) => { e.preventDefault()}:handleEmailSend}
        className="mt-8 bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md space-y-6"
      >
        {/* Email */}
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-3"
          >
            Email Address
          <input
            type="email"
            placeholder="you@example.com"
            required
            ref={emailRef}
            className="input input-bordered w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          </label>

        </div>

        {/* Remember Me */}
        {/* <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="checkbox checkbox-indigo"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
            Keep me signed in
          </label>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full bg-indigo-600 text-white hover:bg-indigo-500"
        >
          {submitLoading? <span className="loading loading-spinner loading-md"></span>:"Next"}
        </button>
      </form>
    </div>
  );
};

export default EnterEmail;
