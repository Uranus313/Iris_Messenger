import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import sth from "../../../../assets/Background.png";
import { Core_api_Link, Media_api_Link } from "../../../../consts/APILink";
import userContext from "../../../../contexts/userContext";
import { Direct } from "../../../../interfaces/interfaces";
import { KeyType, serializeKey } from "../../MainPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DirectMessage from "./directMessage/DirectMessage";


interface Props {
  showChatList: () => void;
  direct: Direct;
  messageMap: Map<KeyType, any[]>;
  sendMessage: (message: any) => void;
}

const DirectPage = ({
  showChatList,
  direct,
  messageMap,
  sendMessage,
}: Props) => {
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [media, setMedia] = useState<File | null>(null);
  const { user } = useContext(userContext);
  const [error, setError] = useState<string | null>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  
  const toggleRightMenu = () => {
    setIsRightMenuOpen(!isRightMenuOpen);
  };
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
    }
  };

  const handleSendMessage = async (formData: any) => {
    if (!formData.text && !media) {
      alert("Please enter a message or select a file.");
      return;
    }

    // Prepare file buffer if a file is provided
    let fileBuffer = null;
    let fileName = null;
    if (media) {
      const arrayBuffer = await media.arrayBuffer();
      fileBuffer = Array.from(new Uint8Array(arrayBuffer));
      fileName = media.name;
    }

    // Prepare data to emit
    const data = {
      text: formData.text,
      messageType: "direct",
      directId: direct._id,
    };

    const payload = {
      data,
      filename: fileName,
      fileBuffer, // File buffer or null
    };

    // Emit data to the server
    console.log("Sending message...");
    sendMessage(payload);

    // Reset form
    // setText("");
    // setTargetUserId("");
    // setFile(null);
  };  const banUserMutate = useMutation({
    mutationFn: async (data: { targetUserId: number }) => {
      const result = await fetch(Core_api_Link + `users/blockUser`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult;
      } else {
        throw new Error(jsonResult.message);
      }
    },
    onSuccess: () => {
      setSubmitLoading(false);
      queryClient.invalidateQueries({ queryKey: ["directs"] });
      queryClient.invalidateQueries({ queryKey: ["allChats"] });
      showChatList();
    },
    onError: (error) => {
      setSubmitLoading(false);
      setError(error.message);
    },
  });
  const handleBan = () => {
    setSubmitLoading(true);
    banUserMutate.mutate({ targetUserId: direct.user.id });
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
              <div className="">
                <h2 className="mt-5 text-xl font-bold text-base-content">
                  {direct.user.firstName + " " + direct.user.firstName}
                </h2>
                <p className="text-sm text-gray-500">{direct.user.isOnline}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 space-y-4 ">
              {/* Phone */}
              <div className="flex items-center">
                <i className="fas fa-phone text-xl text-gray-500"></i>
                <div className="">
                  <p className="text-base-content font-medium">
                    {direct.user.phoneNumber}
                  </p>
                  <p className="text-sm text-gray-500">Phone</p>
                </div>
              </div>

              {/* Username */}
              <div className="flex items-center">
                <i className="fas fa-at text-xl text-gray-500"></i>
                <div className="">
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
            <form
              onSubmit={
                submitLoading
                  ? (e) => e.preventDefault()
                  : handleSubmit(handleBan)
              }
              className="flex ms-10 w-full"
            >
              <button className="">
                {submitLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Block User"
                )}
              </button>
              {error && error}
            </form>
          </div>
        </div>
      </div>

      {messageMap.get(serializeKey({ _id: direct._id, type: "direct" }))?.map((message) => {
        return (
          <DirectMessage
            content={message.text}
            time={message.createdAt}
            isSender={user?.id == message.sender.id}
            key={message._id}
          />
        );
      })}

      {/* Input Field */}
      <form

        onSubmit={handleSubmit(handleSendMessage)}
        className="flex items-center bg-base-200 p-4 fixed bottom-0"
      >
      <div className="flex items-center bg-base-200 p-4">
        <input
          type="text"
          placeholder="Type a message"
          className="input input-bordered flex-1"
          {...register("text")}
        />
        <button className="btn btn-primary ml-2">Send</button>
      </div>
      <div className="flex flex-col items-center">
        {media ? (
          <img
            src={URL.createObjectURL(media as Blob)}
            alt="Profile"
            className="w-10 h-10 rounded-full mb-4 object-cover border-2 border-indigo-500"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
            <span className="text-gray-400 text-xs ml-1">No Image</span>
          </div>
        )}
        <label className="btn btn-sm btn-outline text-xs">
          Upload Picture
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
      </form>
    </div>
  );
};

export default DirectPage;
