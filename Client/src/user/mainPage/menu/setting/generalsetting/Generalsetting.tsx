import React, { useState } from "react";

interface Props {
  goBack: () => void;
}

const Generalsetting = ({ goBack }: Props) => {
  // State for theme
  const [theme, setTheme] = useState("dark");

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const changeTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  return (
    <div className="bg-base-300 text-white">
      {/* Content Section */}
      <div className="bg-gray-800 w-full h-full p-4 shadow-lg">
        {/* Header */}
        <div className="flex items-center mb-6">
          {/* Back Button */}
          <button
            onClick={() => goBack()}
            className="btn  text-lg text-white me-3 "
          >
            <p className="">B</p>
          </button>
          <h1 className="text-xl font-bold">General Settings</h1>
        </div>

        {/* Theme Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Theme</h2>
          <div className="flex items-center justify-between">
            <select
              className="select select-bordered bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              value={theme}
              onChange={changeTheme}
            >
              {themes.map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-base-300 mt-4">
        Up da ted 10 .4 Sept em be r 29, 20 24 I mp ro v ed stru ctu re
      </p>
    </div>
  );
};

export default Generalsetting;
