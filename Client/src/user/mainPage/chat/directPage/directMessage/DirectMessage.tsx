interface Props {
  content: string; // Message content
  time: string; // Time of the message
  isSender: boolean; // Whether the message is sent by the user
}

const DirectMessage = ({ content, time, isSender }: Props) => {
  return (
    <div
      className={`flex mb-4 ${
        isSender ? "justify-end" : "justify-start"
      } items-end`}
    >
      <div
        className={`${
          isSender
            ? "bg-primary text-primary-content"
            : "bg-base-300 text-base-content"
        } px-4 py-2 rounded-lg max-w-xs`}
      >
        <p className="text-sm">{content}</p>
        <span
          className={`text-xs ${
            isSender ? "text-gray-300" : "text-gray-500"
          } block mt-1 text-right`}
        >
          {time}
        </span>
      </div>
    </div>
  );
};

export default DirectMessage;
