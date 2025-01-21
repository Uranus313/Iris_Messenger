import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IAM_api_Link } from "../../../consts/APILink";

interface Admin {
  id: number;
  name: string;
  email: string;
}

const AdminList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
  const [admins, setAdmins] = useState<Admin[]>([]); // State for admin list
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state

  // Mutation to fetch admins
  const getAdmins = useMutation({
    mutationFn: async (email?: string) => {
      const query = email ? `?search=${email}` : "";
      const result = await fetch(
        IAM_api_Link + `/admins/getAllAdmins${query}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult;
      } else {
        throw new Error(jsonResult.message);
      }
    },
    onSuccess: (result) => {
      setAdmins(result); // Update the admin list with the fetched data
      setErrorMessage(null); // Clear any previous errors
    },
    onError: (error: any) => {
      setErrorMessage(error.message); // Show error message
    },
  });

  // // Fetch all admins on component mount
  // useEffect(() => {
  //   getAdmins.mutate(); // Fetch all admins when the component mounts
  // }, []);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value; // Get the search term
    setSearchTerm(term);

    // Call the mutation with the search term to dynamically filter admins
    getAdmins.mutate(term || undefined); // If the term is empty, fetch all admins
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">Admin List</h2>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search admins"
        value={searchTerm}
        onChange={handleSearch}
        className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-500 mb-4"
      />

      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      {/* Admin List */}
      <ul className="space-y-4">
        {admins.map((admin) => (
          <li
            key={admin.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
          >
            <div>
              <p className="font-bold">{admin.name}</p>
              <p className="text-sm text-gray-400">{admin.email}</p>
            </div>
            <button
              onClick={() => console.log(`Remove admin with ID ${admin.id}`)}
              className="btn bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md"
            >
              Remove
            </button>
          </li>
        ))}

        {/* No Results Message */}
        {admins.length === 0 && (
          <p className="text-gray-400 mt-4 text-center">
            {searchTerm ? "No matching admins found." : "No admins available."}
          </p>
        )}
      </ul>
    </div>
  );
};

export default AdminList;
