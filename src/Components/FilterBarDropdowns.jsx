import { useState } from "react";

const FilterBarDropdowns = ( ) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div className="relative max-w-7xl mx-auto p-3">
      <div className="flex items-center gap-2 overflow-x-auto">
        {((item, index) => (
          <button
            key={index}
            onClick={() => item.dropdown && toggleDropdown(item.label)}
            className={`flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 whitespace-nowrap text-sm font-medium shadow-sm hover:shadow-md ${
              item.dropdown ? "cursor-pointer" : ""
            }`}
          >
            <span className="mr-2 text-md">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Dropdown area outside scroll container */}
      {filterItems.map(
        (item) =>
          item.dropdown &&
          activeDropdown === item.label && (
            <div
              key={item.label}
              className="absolute z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[160px] animate-fadeIn overflow-hidden"
              style={{
                top: "100%", // below the buttons container
                left: 0,
              }}
            >
              {item.dropdown.map((option, i) => (
                <button
                  key={i}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                  onClick={() => {
                    console.log(`${item.label}: ${option}`);
                    setActiveDropdown(null);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )
      )}
    </div>
  );
};

export default FilterBarDropdowns;
