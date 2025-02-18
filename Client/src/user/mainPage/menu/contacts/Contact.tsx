import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { IAM_api_Link, Media_api_Link } from "../../../../consts/APILink";
import useGetContacts from "../../../../hooks/useGetContacts";
import { User } from "../../../../interfaces/interfaces";
import AddContact from "./addContact/AddContact";
import RemoveContact from "./removeContact/RemoveContact";

interface Props {
  goBack: () => void;
}

const Contact = ({ goBack }: Props) => {
  const { data: contacts, error, isLoading } = useGetContacts();
  const [userSearched, setUsersSearched] = useState<User[]>([]);
  const [showError, setShowError] = useState<string | null>();
  const [selectedContact, setSelectedContact] = useState<User | null>(null); // State for selected contact
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State for selected user

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

  const handleUserClick = (contact: User) => {
    setSelectedUser(contact);
  };

  const handleContactClick = (contact: User) => {
    setSelectedContact(contact);
  };

  return (
    <div className="min-h-screen bg-base-300 text-white">
      {error && error.message}
      {showError && showError}
      {isLoading && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      {selectedUser ? (
        <AddContact
          goBack={() => {
            setSelectedUser(null);
            setSelectedContact(null);
            setUsersSearched([]);
          }}
          selectedContact={selectedUser}
        />
      ) : selectedContact ? (
        <RemoveContact
          goBack={() => {
            setSelectedContact(null);
            setSelectedUser(null);
            setUsersSearched([]);
          }}
          selectedContact={selectedContact}
        />
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
              className="input input-bordered w-full"
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
                  onClick={() => handleUserClick(contact)} // Set selected contact on click
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
                  onClick={() => handleContactClick(contact)}
                  className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg cursor-pointer"
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
        Updated 10.4 September 29, 2024 - Improved structure
      </p>
    </div>
  );
};

export default Contact;
