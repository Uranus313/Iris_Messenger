import useGetDirects from "../../../../hooks/useGetDirects";

const DirectsChat = () => {
  let { data, error, isLoading } = useGetDirects();
  return (
    <div className="w-full max-w-lg bg-base-300 rounded-lg shadow-lg">
      <p>{error?.message}</p>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <div className="divide-y divide-base-200">
          {data?.data?.length! > 0 ? (
            data?.data?.map((direct, index) => (
              // <GroupsChatItem key={index} group={group} />
              <p></p>
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
