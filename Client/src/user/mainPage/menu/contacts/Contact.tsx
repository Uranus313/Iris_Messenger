import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { IAM_api_Link, Media_api_Link } from "../../../../consts/APILink";
import useGetContacts from "../../../../hooks/useGetContacts";
import { User } from "../../../../interfaces/interfaces";

interface Props {
  goBack: () => void;
}

const Contact = ({ goBack }: Props) => {
  const { data: contacts, error, isLoading } = useGetContacts();
  const [userSearched, setUsersSearched] = useState<User[]>([]);
  const [showError, setShowError] = useState<string | null>();
  const [selectedContact, setSelectedContact] = useState<User | null>(null); // State for selected contact

  const getUserBySearch = useMutation({
    mutationFn: async (email: string) => {
      const result = await fetch(
        IAM_api_Link + `users/searchUserByEmail/` + email,
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
      setUsersSearched(result);
    },
    onError: (error) => {
      setShowError(error.message);
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email) {
      getUserBySearch.mutate(email);
    }
  };

  const handleContactClick = (contact: User) => {
    setSelectedContact(contact); // Set the selected contact
  };

  const handleBackToList = () => {
    setSelectedContact(null); // Reset the selected contact to return to the list
  };

  return (
    <div className="min-h-screen bg-base-300 text-white">
      {selectedContact ? (
        // AddContact Component
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
            <button
              onClick={handleBackToList}
              className="btn btn-circle btn-outline mb-4"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className="text-2xl font-bold text-center mb-6">Add Contact</h1>
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={
                    selectedContact?.profilePicture ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                <h2 className="text-xl font-semibold mt-2">
                  {selectedContact?.firstName}
                </h2>
                <p className="text-gray-600">
                  {selectedContact?.email || "No email provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Contact List
        <>
          {/* Header and Search Bar */}
          <div className="sticky top-0 bg-gray-800 p-4 flex items-center gap-2">
            <button
              onClick={goBack}
              className="btn btn-circle btn-sm btn-outline text-white"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full text-black"
              onChange={handleSearch}
            />
          </div>

          {/* Contact List */}
          <ul className="p-4 space-y-3">
            {userSearched.length > 0 ? (
              userSearched.map((contact) => (
                <li
                  key={contact.id}
                  className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg cursor-pointer"
                  onClick={() => handleContactClick(contact)} // Set selected contact on click
                >
                  <img
                    src={
                      contact.profilePicture
                        ? Media_api_Link + "file/" + contact.profilePicture
                        : ""
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{contact.firstName}</p>
                    <p className="text-sm text-gray-400">{contact.isOnline}</p>
                  </div>
                </li>
              ))
            ) : contacts?.length! > 0 ? (
              contacts?.map((contact) => (
                <li
                  key={contact.id}
                  className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg cursor-pointer"
                  onClick={() => handleContactClick(contact)} // Set selected contact on click
                >
                  <img
                    src={
                      contact.profilePicture
                        ? Media_api_Link + "file/" + contact.profilePicture
                        : ""
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{contact.firstName}</p>
                    <p className="text-sm text-gray-400">{contact.isOnline}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-400">No contacts found.</p>
            )}
          </ul>
        </>
      )}
      <p className="text-sm text-base-300 mt-4">
        Up da ted 10 .4 Sept em be r 29, 20 24 I mp ro v ed stru ctu re
      </p>
    </div>
  );
};

export default Contact;
