import React, { useEffect, useState } from "react";
import arrow from "../../images/Vector.png";

const FilterButton = ({ options, onSelect, initialValue }) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="inline-block nuns-font-600 mb-[30px] mx-8 md:mx-[10px]">
      <div className="inline">
        <button
          className="nuns-font-700 text-[16px] rounded-[10px] py-2 px-3 nm-flat-slate-200"
          onClick={toggleOptions}
        >
          {selectedOption || "Select an option"}
          <img
            src={arrow}
            className={`w-[7px] inline ml-3 mr-2 duration-[300ms] ${isOpen ? "rotate-[270deg]" : "rotate-[90deg]"} `}
          />
        </button>
      </div>
      {isOpen && (
        <ul className="absolute text-gray-700 hover:text-black mt-2 py-1 w-fit rounded-[10px] nm-flat-slate-200 shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer px-4 py-2 text-[16px]  hover:nm-inset-slate-200 duration-[300ms] rounded-[10px] ${selectedOption === option ? "nm-inset-slate-300" : ""
                }`}
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterButton;
