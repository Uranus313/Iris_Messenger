import React from "react";

const JoinChannel = () => {
  const handleSubmit = () => {
    alert("Profile submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="bg-base-200 shadow-lg rounded-lg w-full max-w-sm p-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-full bg-gray-200 bg-cover bg-center mb-4"
            style={{
              backgroundImage:
                "url('https://via.placeholder.com/150')", // Placeholder image
            }}
          ></div>
        </div>

        {/* Profile Information */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary mb-2">name</h2>
          <p className="text-gray-600 mb-4">link</p>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full text-white font-semibold py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinChannel;
