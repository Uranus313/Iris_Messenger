import React from "react";

const Verification = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        {/* Avatar Icon */}

        <div className="flex justify-center mb-4">

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHFmeR5ebZ8wuQKRj__rCMA4cnCscieEUYRw&s" className="w-40 h-40 rounded-full"></img>
        
        </div>
        
        {/* <div className="flex justify-center mb-4">

          <div className="avatar">
            <div className="w-24 rounded-full bg-base-100">
              <span className="text-5xl">🐵</span>
            </div>
          </div>
        </div> */}

        {/* Email Display */}
        <p className="text-xl font-semibold">example@mail.com</p>
        <p className="text-gray-400 mt-2">
          We have sent you a code. <br />
           Please enter the code below to verify your email.
        </p>

        {/* Code Input Field */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter Verification Code"
            className="input input-bordered w-full max-w-xs bg-gray-800"
          />
        </div>

        {/* Verify Button */}
        <div className="mt-4">
          <button className="btn btn-primary w-full max-w-xs">
            Verify Code
          </button>
        </div>

        {/* Resend Code Option */}
        <p className="text-gray-400 mt-4 text-sm">
          Didn't receive the code?{" "}
          <button className="text-blue-400 hover:underline">
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default Verification;
