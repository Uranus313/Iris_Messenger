import useGetDirects from "../../../../hooks/useGetDirects";
import { Channel, Direct, Group } from "../../../../interfaces/interfaces";
import DirectsChatItem from "./directsChatItem/DirectsChatItem";

interface Props {
  setSelectedChatStatus: (
    nextState: "group" | "channel" | "direct" | null
  ) => void;
  setSelectedChat: (nextState: Group | Channel | Direct | null) => void;
}

const DirectsChat = ({ setSelectedChat, setSelectedChatStatus }: Props) => {
  let { data, error, isLoading } = useGetDirects();
  return (
    <div className="w-full max-w-lg bg-base-300 rounded-lg shadow-lg">
      <p>{error?.message}</p>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <div className="divide-y divide-base-200">
          {data?.data?.length! > 0 ? (
            data?.data?.map((directData, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedChat(directData.direct);
                  setSelectedChatStatus(directData.direct.status);
                }}
              >
                <DirectsChatItem
                  key={index}
                  direct={directData.direct}
                  lastMessage={directData.lastMessage}
                />
              </div>
            ))
          ) : (
            <div>No Directs</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DirectsChat;
