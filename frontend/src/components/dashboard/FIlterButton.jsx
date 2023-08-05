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
          className="nuns-font-700 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] shadow-lg duration-[300ms] text-[15px] rounded-[10px] py-2 px-3 "
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
        <ul className="absolute text-gray-700 hover:text-black text-[15px] mt-2 mr-2 w-fit rounded-[10px] bg-white  shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer px-4 py-2 text-[15px] hover:scale-[1.07] hover:bg-gray-100  duration-[300ms] rounded-[10px] ${selectedOption === option ? "font-black bg-gray-100" : ""
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
