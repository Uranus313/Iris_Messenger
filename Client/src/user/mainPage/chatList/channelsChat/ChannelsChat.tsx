import useGetChannels from "../../../../hooks/useGetChannels";
import { Channel, Direct, Group } from "../../../../interfaces/interfaces";
import ChannelsChatItem from "./channelsChatItem/ChannelsChatItem";

interface Props {
  setSelectedChat: (nextState: Group | Channel | Direct | null) => void;
  userChannelsSearched: Channel[];
  setSelectedChatStatus: (
    nextState: "group" | "channel" | "direct" | null
  ) => void;
}

const ChannelsChat = ({
  setSelectedChat,
  userChannelsSearched,
  setSelectedChatStatus,
}: Props) => {
  let { data, error, isLoading } = useGetChannels();
  return (
    <div className="w-full max-w-lg bg-base-300 rounded-lg shadow-lg">
      <p>{error?.message}</p>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <div className="divide-y divide-base-200">
          {userChannelsSearched.length > 0 ? (
            userChannelsSearched.map((channel, index) => (
              <div key={index}>
                <ChannelsChatItem
                  key={index}
                  channel={channel}
                  lastMessage={null}
                />
              </div>
            ))
          ) : data?.data.length! > 0 ? (
            data?.data.map((channelData, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedChat(channelData.channel);
                  setSelectedChatStatus(channelData.channel.status);
                }}
              >
                <ChannelsChatItem
                  key={index}
                  channel={channelData.channel}
                  lastMessage={channelData.lastMessage}
                />
              </div>
            ))
          ) : (
            <div>No Channel</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChannelsChat;
