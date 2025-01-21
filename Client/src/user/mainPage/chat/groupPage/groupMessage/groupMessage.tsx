import { Media_api_Link } from "../../../../../consts/APILink";

interface Props {
  isSender: boolean;
  name?: string;
  avatarUrl?: string;
  message: string;
  time: string;
  senderTag?: string;
}

const GroupMesssage = ({
  isSender,
  name,
  avatarUrl,
  message,
  time,
  senderTag,
}: Props) => {
  console.log(avatarUrl);
  return (
    <div
      className={`flex items-start ${
        isSender ? "flex-row-reverse items-end" : ""
      } mb-4`}
    >
      {/* Avatar */}
      {!avatarUrl && !isSender ? (
        <div className="avatar bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>
      ) : !avatarUrl || isSender ? null : (
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img
              src={Media_api_Link + "file/" + avatarUrl}
              alt={`${name || "User"}'s avatar`}
            />
          </div>
        </div>
      )}

      {/* Message Content */}
      <div
        className={`px-4 py-2 rounded-lg max-w-md ${
          isSender
            ? "bg-secondary text-secondary-content"
            : "bg-primary text-primary-content"
        }`}
      >
        {name && !isSender && (
          <div className="font-bold text-sm">
            {name}{" "}
            {senderTag && (
              <span className="text-xs text-gray-400">{senderTag}</span>
            )}
          </div>
        )}
        <div className="">
          <p className="text-sm">{message}</p>
          <span className="text-xs text-gray-400 mt-1 ml-2">{time}</span>
        </div>

        {isSender && senderTag && (
          <div className="text-xs text-gray-400 mt-1">{senderTag}</div>
        )}
      </div>

      {/* Time */}
    </div>
  );
};

export default GroupMesssage;

// // Example usage
// const ChatWindow: React.FC = () => {
//   const messages = [
//     {
//       isSender: false,
//       name: "Narj 🍂",
//       avatarUrl: "https://via.placeholder.com/150",
//       message: "بچه ها نظریه ظرفیت خورد اگه کسی میخواد بگیره",
//       time: "12:19",
//     },
//     {
//       isSender: true,
//       message: "دوستان ساختمان:زاده تلاش کنم سالن امتحانات 23 آبان بگیرم؟",
//       time: "15:39",
//     },
//     {
//       isSender: true,
//       message: "دوستان ساختمان:زاده تلاش کنم سالن امتحانات 23 آبان بگیرم؟",
//       time: "15:40",
//       senderTag: "حسن‌پور",
//     },
//     {
//       isSender: false,
//       name: "Fatima Shateri",
//       avatarUrl: "",
//       message: "هر چی دیرتر بهتر",
//       time: "15:57",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-base-200 p-4">
//       <div className="text-center text-sm text-gray-400 mb-4">
//         October 17, 2023
//       </div>
//       {messages.map((msg, index) => (
//         <MessageBubble
//           key={index}
//           isSender={msg.isSender}
//           name={msg.name}
//           avatarUrl={msg.avatarUrl}
//           message={msg.message}
//           time={msg.time}
//           senderTag={msg.senderTag}
//         />
//       ))}
//     </div>
//   );
// };

// export default ChatWindow;
