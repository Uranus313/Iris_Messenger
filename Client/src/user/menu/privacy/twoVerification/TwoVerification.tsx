const TwoVerification = () => {
  return (
    <div className="flex justify-center items-center  bg-gray-900 text-white ">
      <div className="bg-gray-800 rounded-lg shadow-md p-6  w-full">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="text-yellow-500 text-6xl mb-4">
            <i className="fas fa-lock"></i>
          </div>
        </div>
        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-2">
          Two-Step Verification
        </h2>
        {/* Description */}
        <p className="text-center text-gray-400 mb-6">
          You have enabled Two-Step verification. You'll need the password you
          set up here to log in to your Telegram account.
        </p>
        {/* Buttons */}
        <div className="space-y-3">
          <button className="btn btn-primary w-full">Change Password</button>
          <button className="btn btn-warning w-full">Disable Password</button>
        </div>
      </div>
    </div>
  );
};

export default TwoVerification;
