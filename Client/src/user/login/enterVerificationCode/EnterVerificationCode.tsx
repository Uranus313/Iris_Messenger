import { useMutation } from "@tanstack/react-query";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IAM_api_Link } from "../../../consts/APILink";
import { useNavigate } from "react-router-dom";



interface Props{
  goToNextStage : () => void,
  goToPreviousStage : () => void,
  email : string
}




const EnterVerificationCode = ({goToNextStage , goToPreviousStage , email} : Props) => {
  const verificationCodeRef = useRef<HTMLInputElement>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [resendCodeLoading, setResendCodeLoading] = useState<boolean>(false);
  const [error , setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [time, setTime] = useState(120); // 2 minutes = 120 seconds

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        if(time > 0){
          setTime(prevTime => prevTime - 1);
        }
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [time]);

  const formatTime = (seconds : number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  const verificationCodeMutate = useMutation({
    mutationFn: async (verificationCodeObject : {email : string , verificationCode : string}) => {
       
        const result = await fetch(IAM_api_Link + `users/checkOTP`, {
            method: "POST",
            credentials: 'include',
            
            headers: {
              "Content-Type": "application/json",
              'auth-token': localStorage.getItem("auth-token") || ""
            },
            body: JSON.stringify(verificationCodeObject),
            
      });
      const jsonResult = await result.json();
      console.log(result.headers);
      localStorage.setItem("auth-token",result.headers.get("auth-token") || "");

      console.log(1);
      console.log(3);
      console.log(jsonResult);
      console.log(result.headers);
      result.headers.forEach( (value , name) => {
        console.log(`${name}: ${value}`);
      })
      console.log(2);
      // localStorage.setItem("Authorization",jsonResult.token || "");

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

        if(result.userStatus =="OldUser"){
          navigate("/user");
        }else{
          goToNextStage();
        }

    },
    onError: (error) =>{
        // console.log("error12");
        // console.log(error);
        // console.log(error.message);
        // let errorText = 'error';
        // goToPreviousStage();
        setError(error.message)  
        setSubmitLoading(false);
    }
}); 

  const handleVerificationCodeSend = (e: FormEvent) => {
    e.preventDefault();
    
    if(!verificationCodeRef.current?.value){
      return;
    }
    setSubmitLoading(true);

    verificationCodeMutate.mutate({email : email , verificationCode : verificationCodeRef.current?.value });

  };
  const resendVerificationCodeMutate = useMutation({
    mutationFn: async (emailObject : {email : string }) => {
       
        const result = await fetch(IAM_api_Link + `users/createOTP`, {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(emailObject),
      });
      const jsonResult = await result.json();
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
        setResendCodeLoading(false);
        setTime(120);

    },
    onError: (error) =>{
        setError(error.message)  
        setResendCodeLoading(false);
        setTime(0);
    }
}); 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={submitLoading ? (e) => {e.preventDefault()} : handleVerificationCodeSend} className="text-center">
        {/* Avatar Icon */}

        <div className="flex justify-center mb-4">

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9BiGKA1arud9vvdIknRtvD1ZvlR1Gek7HKw&s" className="w-40 h-40 rounded-full"></img>
        
        </div>
        
        {/* <div className="flex justify-center mb-4">

          <div className="avatar">
            <div className="w-24 rounded-full bg-base-100">
              <span className="text-5xl">🐵</span>
            </div>
          </div>
        </div> */}

        {/* Email Display */}
        <p className="text-xl font-semibold">{email}</p>
        <p className="text-gray-400 mt-2">
          We have sent you a code. <br />
           Please enter the code below to verify your email.
        </p>
        {error && <p>{error}</p>}  
        {/* Code Input Field */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter Verification Code"
            className="input input-bordered w-full max-w-xs bg-gray-800"
            ref={verificationCodeRef}
          />
        </div>

        {/* Verify Button */}
        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full max-w-xs">
            {submitLoading? <span className="loading loading-spinner loading-md"></span>:"Verify Code"}
          </button>
        </div>

        {/* Resend Code Option */}
        <p className="text-gray-400 mt-4 text-sm">
          Didn't receive the code?{" "}
          {resendCodeLoading ? <span className="loading loading-spinner loading-md"></span>:
            (time > 0 ? formatTime(time) : <button onClick={() => {
              setResendCodeLoading(true);
              resendVerificationCodeMutate.mutate({email : email})}} type="button" className="text-blue-400 hover:underline">
              Resend Code
            </button>
            )
          }
          
          
        </p>
      </form>
    </div>
  );
};

export default EnterVerificationCode;
