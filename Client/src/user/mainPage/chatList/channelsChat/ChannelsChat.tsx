import useGetChannels from "../../../../hooks/useGetChannels";
import { Channel, Direct, Group } from "../../../../interfaces/interfaces";
import ChannelsChatItem from "./channelsChatItem/ChannelsChatItem";

interface Props {
  setSelectedChat: (nextState: Group | Channel | Direct | null) => void;
}

const ChannelsChat = ({ setSelectedChat }: Props) => {
  let { data, error, isLoading } = useGetChannels();
  return (
    <div className="w-full max-w-lg bg-base-300 rounded-lg shadow-lg">
      <p>{error?.message}</p>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <div className="divide-y divide-base-200">
          {data?.data.length! > 0 ? (
            data?.data?.map((channelData, index) => (
              <div
                key={index}
                onClick={() => setSelectedChat(channelData.channel)}
              >
                <ChannelsChatItem
                  key={index}
                  channel={channelData.channel}
                  lastMessage={channelData.lastMessage}
                />
              </div>
            ))
          ) : (
            <div>No Channels</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChannelsChat;
