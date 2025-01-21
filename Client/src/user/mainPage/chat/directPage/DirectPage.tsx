import { useState } from "react";
import sth from "../../../../assets/Background.png";
import { Media_api_Link } from "../../../../consts/APILink";
import { Direct } from "../../../../interfaces/interfaces";
import DirectMessage from "./directMessage/DirectMessage";

interface Props {
  showChatList: () => void;
  direct: Direct;
}

const DirectPage = ({ showChatList, direct }: Props) => {
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);

  const toggleRightMenu = () => {
    setIsRightMenuOpen(!isRightMenuOpen);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${sth})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-base-200">
        <button className="block md:hidden p-2" onClick={showChatList}>
          back
        </button>
        <button onClick={toggleRightMenu}>
          <div className="flex items-center">
            <div className="avatar mr-3">
              <div className="w-10 rounded-full">
                <img
                  src={
                    direct.user.profilePicture
                      ? Media_api_Link + "file/" + direct.user.profilePicture
                      : ""
                  }
                  alt="User"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">{direct.user.firstName}</h1>
              <p className="text-xs text-gray-400">{direct.user.isOnline}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Right Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-base-200 shadow-lg transform ${
          isRightMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <button
            onClick={toggleRightMenu}
            className="btn btn-circle btn-sm btn-ghost mb-4"
          >
            ✕
          </button>
          <h2 className="text-lg font-bold mb-4">Menu</h2>
          <div className="flex flex-col w-full md:w-1/3 h-screen bg-base-200 shadow-lg relative">
            {/* User Avatar and Name */}
            <div className="p-4 flex flex-col items-center">
              <div className="avatar ms-32">
                <div className="w-32 h-32 rounded-full ">
                  <img
                    className=""
                    src={
                      direct.user.profilePicture
                        ? Media_api_Link + "file/" + direct.user.profilePicture
                        : ""
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="ms-32">
                <h2 className="mt-4 text-xl font-bold text-base-content">
                  {direct.user.firstName + " " + direct.user.firstName}
                </h2>
                <p className="text-sm text-gray-500">{direct.user.isOnline}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 space-y-4 ms-12 ">
              {/* Phone */}
              <div className="flex items-center">
                <i className="fas fa-phone text-xl text-gray-500"></i>
                <div className="ml-4">
                  <p className="text-base-content font-medium">
                    {direct.user.phoneNumber}
                  </p>
                  <p className="text-sm text-gray-500">Phone</p>
                </div>
              </div>

              {/* Username */}
              <div className="flex items-center">
                <i className="fas fa-at text-xl text-gray-500"></i>
                <div className="ml-4">
                  <p className="text-base-content font-medium">
                    {direct.user.username}
                  </p>
                  <p className="text-sm text-gray-500">Username</p>
                </div>
              </div>

              {/* Bio */}
              <div className="flex items-center">
                <i className="fas fa-info-circle text-xl text-gray-500"></i>
                <div className="ml-4">
                  <p className="text-base-content font-medium">...</p>
                  <p className="text-sm text-gray-500">{direct.user.bio}</p>
                </div>
              </div>
            </div>
            <div className="flex ms-10 w-full">
              <div className="">
                <button className="btn btn-sm ">Block User</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Date Separator */}
        <div className="text-center my-2 text-xs text-gray-500">January 5</div>

        <DirectMessage content={""} time={""} isSender={false} />

        {/* Date Separator */}
        <div className="text-center my-2 text-xs text-gray-500">January 6</div>

        <div className="flex justify-end mb-4">
          <div className="bg-primary text-primary-content px-4 py-2 rounded-lg max-w-xs">
            <p className="text-sm">آها حله مرسی</p>
            <span className="text-xs text-gray-300 block text-right mt-1">
              00:00
            </span>
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="flex items-center bg-base-200 p-4">
        <button className="btn btn-ghost btn-circle mr-2">
          <i className="fas fa-smile"></i>
        </button>
        <input
          type="text"
          placeholder="Message"
          className="input input-bordered flex-1"
        />
        <button className="btn btn-ghost btn-circle ml-2">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default DirectPage;
