import { useState } from "react";

const Contact = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample Data (Replace with real data from API)
  const contacts = [
    {
      id: 1,
      name: "خدامی",
      status: "last seen recently",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "عکاسی خزر قهرمانی",
      status: "last seen recently",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      name: "Ali Mirshamsi",
      status: "last seen recently",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 6,
      name: "میرزاپور",
      status: "last seen recently",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 7,
      name: "مهدی بانکی",
      status: "last seen recently",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 8,
      name: "دوچرخه قربانی",
      status: "last seen recently",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 9,
      name: "Amirreza",
      status: "last seen recently",
      avatar: "https://via.placeholder.com/50",
    },
  ];

  // Filter Contacts by Search Term
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header and Search Bar */}
      <div className="sticky top-0 bg-gray-800 p-4 flex items-center gap-2">
        <button className="btn btn-circle btn-sm btn-outline text-white">
          <i className="fas fa-arrow-left"></i>
        </button>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <ul className="p-4 space-y-3">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg"
            >
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-400">{contact.status}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-400">No contacts found.</p>
        )}
      </ul>

      {/* Add Contact Button */}
      <button className="btn btn-circle btn-primary fixed bottom-5 right-5">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default Contact;
