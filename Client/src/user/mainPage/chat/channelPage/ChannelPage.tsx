import { useState } from "react";
import sth from "../../../../assets/Background.png";
import { Media_api_Link } from "../../../../consts/APILink";
import { Channel } from "../../../../interfaces/interfaces";

interface Props {
  showChatList: () => void;
  channel: Channel;
}

const ChannelPage = ({ showChatList, channel }: Props) => {
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);

  const toggleRightMenu = () => {
    setIsRightMenuOpen(!isRightMenuOpen);
  };

  // return user1 ? (
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
                    channel.profilePicture
                      ? Media_api_Link + "file/" + channel.profilePicture
                      : ""
                  }
                  alt="User"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">{channel.name}</h1>
              <p className="text-xs text-gray-400">
                members {" " + channel.memberCount}
              </p>
            </div>
          </div>
        </button>
        {/* <div className="relative">
          <button className="btn btn-sm">
            <img
              className="w-8 h-8 rounded-full"
              src="https://icon-library.com/images/android-3-dot-menu-icon/android-3-dot-menu-icon-0.jpg"
              alt=""
            />
          </button>
        </div> */}
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
          <div className="flex flex-col w-full  h-screen bg-base-200 shadow-lg relative">
            {/* User Avatar and Name */}
            <div className="p-4 flex flex-col">
              <div className="avatar">
                <div className="w-56 h-52 rounded-md ">
                  <img
                    className=""
                    src={
                      channel.profilePicture
                        ? Media_api_Link + "file/" + channel.profilePicture
                        : ""
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="">
                <h2 className="mt-5 text-xl font-bold text-base-content">
                  {channel.name}
                </h2>
                <div className="w-full flex gap-2">
                  <p className="text-sm w-full text-gray-500 ">members </p>
                  <p className="text-sm w-full text-gray-500">
                    {channel.memberCount}
                  </p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 space-y-4 ">
              {/* Phone */}
              <div className="flex items-center">
                <i className="fas fa-phone text-xl text-gray-500"></i>
                <div className="">
                  <p className="text-sm text-gray-500">{channel.link}</p>
                  <p className="text-base-content font-medium">Link</p>
                </div>
              </div>
              {/* Bio */}
              <div className="flex items-center">
                <i className="fas fa-info-circle text-xl text-gray-500"></i>
                <div className="">
                  <p className="text-base-content font-medium text-ellipsis overflow-hidden w-fit">
                    {channel.description}
                  </p>
                  <p className="text-sm text-gray-500">Description</p>
                </div>
              </div>
            </div>
            <div className="flex  w-full ml-4">
              <div className="">
                <button className="btn btn-sm bg-red-500 text-gray">
                  Leave
                </button>
              </div>
            </div>
            {/* Members List */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <div className="flex items-center justify-between py-3 border-b border-base-200">
                <div className="flex items-center p-3 justify-between">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        src="https://via.placeholder.com/150" // Replace with the member avatar
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="ml-3 text-xs">
                    <p className="text-xs font-medium">amirreza</p>
                    <p className="text-xs text-gray-500">online</p>
                  </div>
                  <span className="text-xs text-gray-400 ms-6">owner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Date Separator */}
        <div className="text-center my-2 text-xs text-gray-500">January 5</div>

        {/* Message Bubble */}
        <div className="flex justify-end mb-4">
          <div className="bg-primary text-primary-content px-4 py-2 rounded-lg max-w-xs">
            <p className="text-sm">خروجی پروژه‌ها جبر چه درصدایی باید باشه؟</p>
            <span className="text-xs text-gray-300 block text-right mt-1">
              22:40
            </span>
          </div>
        </div>

        <div className="flex justify-start mb-4">
          <div className="bg-base-300 text-base-content px-4 py-2 rounded-lg max-w-xs">
            <p className="text-sm">سلام ممنونم تو خوبی</p>
            <span className="text-xs text-gray-400 block text-left mt-1">
              23:39
            </span>
          </div>
        </div>

        <div className="flex justify-start mb-4">
          <div className="bg-base-300 text-base-content px-4 py-2 rounded-lg max-w-xs">
            <p className="text-sm">
              ببین برای کی میز. استاد گفت که 20 درصد اوکیه به بالا برای رگرسیون.
            </p>
            <span className="text-xs text-gray-400 block text-left mt-1">
              23:41
            </span>
          </div>
        </div>

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

export default ChannelPage;
