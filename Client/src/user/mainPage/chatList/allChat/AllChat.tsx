import useGetAllChats from "../../../../hooks/useGetAllChats";
import {
  Channel,
  ChannelMessage,
  Direct,
  DirectMessage,
  Group,
  GroupMessage,
} from "../../../../interfaces/interfaces";
import ChannelsChatItem from "../channelsChat/channelsChatItem/ChannelsChatItem";
import DirectsChatItem from "../directsChat/directsChatItem/DirectsChatItem";
import GroupsChatItem from "../groupsChat/groupsChatItem/GroupsChatItem";

interface Props {
  setSelectedChat: (nextState: Group | Channel | Direct | null) => void;
  setSelectedChatStatus: (
    nextState: "group" | "channel" | "direct" | null
  ) => void;
}

const AllChat = ({ setSelectedChat, setSelectedChatStatus }: Props) => {
  let { data, error, isLoading } = useGetAllChats();
  return (
    <div className="w-full max-w-lg bg-base-300 rounded-lg shadow-lg">
      <p>{error?.message}</p>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <div className="divide-y divide-base-200">
          {data?.data.length! > 0 &&
            data?.data.map((chatData, index) =>
              chatData.type == "direct" ? (
                <div
                  key={`direct-${index}`}
                  onClick={() => {
                    setSelectedChat(chatData.conversation);
                    setSelectedChatStatus(chatData.type);
                  }}
                >
                  <DirectsChatItem
                    direct={chatData.conversation as Direct}
                    lastMessage={chatData.lastMessage as DirectMessage}
                  />
                </div>
              ) : chatData.type == "group" ? (
                <div
                  key={`group-${index}`}
                  onClick={() => {
                    setSelectedChat(chatData.conversation);
                    setSelectedChatStatus(chatData.type);
                  }}
                >
                  <GroupsChatItem
                    group={chatData.conversation as Group}
                    lastMessage={chatData.lastMessage as GroupMessage}
                  />
                </div>
              ) : chatData.type == "channel" ? (
                <div
                  key={`channel-${index}`}
                  onClick={() => {
                    setSelectedChat(chatData.conversation);
                    setSelectedChatStatus(chatData.type);
                  }}
                >
                  <ChannelsChatItem
                    channel={chatData.conversation as Channel}
                    lastMessage={chatData.lastMessage as ChannelMessage}
                  />
                </div>
              ) : null
            )}
          {data?.data.length! <= 0 && <div>No Chat</div>}
        </div>
      )}
    </div>
  );
};

export default AllChat;
