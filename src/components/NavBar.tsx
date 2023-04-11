import { useState } from "react";

export const NavBar = () => {
  const tabItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-home"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      name: "Home",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-plus-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="16"></line>
          <line x1="8" x2="16" y1="12" y2="12"></line>
        </svg>
      ),
      name: "New Post",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-user"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      name: "Profile",
    },
  ];
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div className=" mt-14 w-full border-t-2 border-slate-500">
      <ul
        role="tablist"
        className="mx-auto flex flex-col  gap-x-6 overflow-x-auto border-b text-sm"
      >
        {tabItems.map((item, idx) => (
          <li
            key={idx}
            className={`border-b-2 py-2 font-mono ${
              selectedItem == idx
                ? "border-indigo-600 text-indigo-600"
                : "border-slate-500 text-gray-500"
            }`}
          >
            <button
              role="tab"
              aria-selected={selectedItem == idx ? true : false}
              aria-controls={`tabpanel-${idx + 1}`}
              className="flex items-center gap-x-2 rounded-lg px-2 py-2 font-medium duration-150 hover:bg-slate-900 hover:text-white active:bg-gray-100"
              onClick={() => setSelectedItem(idx)}
            >
              {item.icon}
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
