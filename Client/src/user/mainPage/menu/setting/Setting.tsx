import { useContext, useState } from "react";
import { Media_api_Link } from "../../../../consts/APILink";
import userContext from "../../../../contexts/userContext";
// import Autodownload from "./autodownload/Autodownload";
import Editprofile from "./editprofile/Editprofile";
import Generalsetting from "./generalsetting/Generalsetting";
// import Privacy from "./privacy/Privacy";

interface Props {
  goBack: () => void;
}
const Setting = ({ goBack }: Props) => {
  let [SidebarState, setSidebarState] = useState<
    "setting" | "edit" | "general" | "privacy" | "storage"
  >("setting");
  let { user } = useContext(userContext);

  return (
    <div className="max-w-sm flex w-full ">
      {SidebarState == "edit" && (
        <Editprofile goBack={() => setSidebarState("setting")} />
      )}
      {SidebarState == "general" && (
        <Generalsetting goBack={() => setSidebarState("setting")} />
      )}
      {/* {SidebarState == "privacy" && (
        <Privacy goBack={() => setSidebarState("setting")} />
      )}
      {SidebarState == "storage" && (
        <Autodownload goBack={() => setSidebarState("setting")} />
      )} */}
      {SidebarState == "setting" && (
        <div className=" bg-base-300 text-white flex flex-col items-center px-4 py-6">
          {/* Header */}
          <div className="w-full flex items-center mb-6">
            {/* Back Button */}
            <button
              onClick={goBack}
              className="btn text-lg me-3 "
            >
              <p className="">B</p>
            </button>
            {/* Title */}
            <h1 className="text-xl font-bold pe-3">Settings</h1>

            {/* Action Buttons (right-aligned) */}
            <div className="ml-auto flex">
              <button
                onClick={() => setSidebarState("edit")}
                className="btn btn-ghost text-lg "
              >
                <p className="">Edit</p>
              </button>
            </div>
          </div>

          {/* Profile Section */}
          <div className="w-full flex flex-col items-center bg-gray-800 rounded-lg p-4 mb-6">
            <div className="mb-4">
              {user?.profilePicture ? (
                <img
                  src={Media_api_Link + "file/" + user.profilePicture}
                  alt="Profile"
                  className=" w-20 h-30  rounded-full bg-gray-700 mb-4 flex items-center justify-center"
                />
              ) : (
                <div className="w-30 h-30  rounded-full bg-gray-700 mb-4 flex items-center justify-center">
                  <span className="text-gray-400 absolute top-6 left-2 ">
                    No Image
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold">
              {(user?.firstName + " " + user?.lastName).trim()}
            </h2>
          </div>

          {/* Contact Info */}
          <div className="w-full mb-6">
            <div className="flex items-center justify-between text-gray-400 py-2">
              <i className="fas fa-at"></i>
              <div className="flex-1 ml-4">
                <p className="text-white font-medium">{user?.email}</p>
                <p className="text-gray-500 text-sm">Email</p>
              </div>
            </div>
            {user?.phoneNumber && (
              <div className="flex items-center justify-between text-gray-400 py-2">
                <i className="fas fa-phone"></i>
                <div className="flex-1 ml-4">
                  <p className="text-white font-medium">{user?.phoneNumber}</p>
                  <p className="text-gray-500 text-sm">Phone</p>
                </div>
              </div>
            )}

            {user?.username && (
              <div className="flex items-center justify-between text-gray-400 py-2">
                <i className="fas fa-at"></i>
                <div className="flex-1 ml-4">
                  <p className="text-white font-medium">{user?.username}</p>
                  <p className="text-gray-500 text-sm">Username</p>
                </div>
              </div>
            )}
          </div>

          {/* Settings Options */}
          <div className="w-full h-full">
            {/* <div className="flex items-center justify-between py-3 text-gray-400 hover:text-white">
              <i className="fas fa-database"></i>
              <button
                onClick={() => setSidebarState("storage")}
                className="ml-4 flex-1 text-left"
              >
                Data and Storage
              </button>
            </div> */}
            {/* <div className="flex items-center justify-between py-3 text-gray-400 hover:text-white">
              <i className="fas fa-lock"></i>
              <button
                onClick={() => setSidebarState("privacy")}
                className="ml-4 flex-1 text-left"
              >
                Privacy and Security
              </button>
            </div> */}
            <div className="flex items-center justify-between py-3 text-gray-400 hover:text-white">
              <i className="fas fa-cogs"></i>
              <button
                onClick={() => setSidebarState("general")}
                className="ml-4 flex-1 text-left"
              >
                General Settings
              </button>
            </div>
          </div>
          <p className="text-sm text-base-300 mt-4">
            Up da ted 10 .4 Sept em be r 29, 20 24 I mp ro v ed stru ctu re
          </p>
        </div>
      )}
    </div>
  );
};

export default Setting;
