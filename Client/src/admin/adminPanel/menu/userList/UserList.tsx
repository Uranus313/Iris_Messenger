import { useState } from "react";
import { IAM_api_Link, Media_api_Link } from "../../../../consts/APILink";
import useGetUsersByAdmin from "../../../../hooks/useGetUsersByAdmin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  let [userId, SetUserId] = useState<number>();
  const queryClient = useQueryClient();
  const [showError, setShowError] = useState<string | null>();
  const [banLoading, setBanLoading] = useState<boolean>(false);
  const { handleSubmit } = useForm();
  let { data: users, error, isLoading } = useGetUsersByAdmin();
  const filteredUsers = users?.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const banUser = useMutation({
    mutationFn: async (userId: number) => {
      console.log(userId);
      const result = await fetch(IAM_api_Link + `users/banUser/${userId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult;
      } else {
        throw new Error(jsonResult.message);
      }
    },
    onSuccess: () => {
      setBanLoading(false);
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (error) => {
      setBanLoading(false);
      setShowError(error.message);
    },
  });
  const handleBan = () => {
    setBanLoading(true);
    if (userId) {
      banUser.mutate(userId);
    }
  };

  return (
    <div className="scroll">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <input
        type="text"
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-500 mb-4"
      />
      <p>{error && error?.message}</p>
      {showError && showError}
      <ul className="space-y-4">
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : filteredUsers?.length! > 0 ? (
          filteredUsers?.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between gap-4 bg-gray-800 p-4 rounded-lg"
            >
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    user.profilePicture
                      ? Media_api_Link + "file/" + user.profilePicture
                      : ""
                  }
                  alt={`${user.firstName} profile`}
                  className="w-12 h-12 rounded-full object-cover overflow-hidden"
                />
                {/* User Info */}
                <div>
                  <p className="font-medium text-white">
                    {user.firstName + " " + user.lastName}
                  </p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
              {/* Ban Button */}
              <form
                onSubmit={
                  banLoading
                    ? (e) => {
                        e.preventDefault();
                      }
                    : handleSubmit(handleBan)
                }
              >
                <button
                  key={user.id}
                  className="btn bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md"
                  onClick={() => SetUserId(user.id)}
                >
                  {banLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Ban"
                  )}
                </button>
              </form>
            </li>
          ))
        ) : (
          <div>No User</div>
        )}
      </ul>
    </div>
  );
};

export default UserList;
