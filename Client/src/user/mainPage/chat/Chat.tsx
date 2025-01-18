import sth from "../../../assets/Background.png";

interface Props {
  user1?: string | null;
  user2?: string | null;
  chatList: boolean;
  showChatList: () => void;
}

const Chat = ({ user1, user2, showChatList, chatList }: Props) => {
  return user1 ? (
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
      <div className="flex items-center justify-start px-4 py-3 bg-base-200">
        <button className="block md:hidden p-2" onClick={showChatList}>
          back
        </button>
        <div className="flex items-center">
          <div className="avatar mr-3">
            <div className="w-10 rounded-full">
              <img src={sth} alt="User" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold">Masoud Salehi</h1>
            <p className="text-xs text-gray-400">last seen recently</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="btn btn-ghost btn-sm">
            <i className="fas fa-search"></i>
          </button>
          <button className="btn btn-ghost btn-sm">
            <i className="fas fa-phone"></i>
          </button>
          <button className="btn btn-ghost btn-sm">
            <i className="fas fa-ellipsis-v"></i>
          </button>
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
  ) : (
    <div className="flex justify-center items-center h-screen">
      No Chat Selected...
    </div>
  );
};

export default Chat;
