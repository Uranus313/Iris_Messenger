import React from "react";

interface props {
  message: string;
  time: string;
}

const ChannelMessage= ({time, message}: props) => {
  return (
    <div className="flex text-left flex-col bg-base-300 text-base-content rounded-lg p-4 max-w-md shadow-lg space-y-2">
      {/* Message Content */}
      <p className="text-sm leading-relaxed">{message}</p>

      {/* Time */}
      <div className="flex justify-end text-gray-500 text-xs mt-2">{time}</div>
    </div>
  );
};


export default ChannelMessage;
