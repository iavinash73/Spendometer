import React, { useState } from "react";
import arrow from "../../images/Vector.png";

const ProgressBar = ({ expenses }) => {
  const [selectedOption, setSelectedOption] = useState("This Month");
  const [isOpen, setIsOpen] = useState(false);
  const uniqueTags = [...new Set(expenses.map((expense) => expense.tag))];

  const filteredData = expenses.filter((item) => {
    const dateFilter =
      selectedOption === "This Week"
        ? new Date(item.date) >= new Date(new Date().setDate(new Date().getDate() - 7))
        : selectedOption === "This Month"
        ? new Date(item.date) >= new Date(new Date().setMonth(new Date().getMonth() - 1))
        : true;

    return dateFilter;
  });
  const totalExpense = filteredData.reduce((acc, expense) => acc + expense.cost, 0);

  const totalExpensesByTag = uniqueTags.reduce((acc, tag) => {
    const tagExpenses = filteredData.filter((expense) => expense.tag === tag);
    const tagTotalExpense = tagExpenses.reduce((sum, expense) => sum + expense.cost, 0);
    return { ...acc, [tag]: tagTotalExpense };
  }, {});

  const colors = [
    ["from-blue-400", "to-emerald-400"],
    ["from-red-500", "to-green-500"],
    ["from-indigo-300", "to-purple-400"],
  ];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const options = ["This Week", "This Month", "View All"];

  return (
    <>
      <div className="relative mt-8 mx-4 md:mx-0 md:mt-0 mb-6 nuns-font-600">
        <div className="inline">
          <button
            className="nuns-font-700 text-[16px] text-black rounded-[10px] py-2 px-3 nm-flat-slate-200"
            onClick={toggleOptions}
          >
            {selectedOption || "Select an option"}
            <img
              src={arrow}
              className={`w-[7px] inline ml-3 mr-2 duration-[300ms] ${
                isOpen ? "rotate-[270deg]" : "rotate-[90deg]"
              } `}
            />
          </button>
        </div>
        {isOpen && (
          <ul className="absolute text-gray-700 hover:text-black mt-2 py-1 w-fit rounded-[10px] nm-flat-slate-200 shadow-lg z-[1]">
            {options.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer px-4 py-2 text-[16px]  hover:nm-inset-slate-200 duration-[300ms] rounded-[10px] ${
                  selectedOption === option ? "nm-inset-slate-300" : ""
                }`}
                onClick={() => handleOptionChange(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="space-y-2 mt-[30px] pt-[15px] pb-[25px] px-6 nuns-font-600 nm-inset-slate-200 rounded-[10px]">
        {uniqueTags.map((tag, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="text-black text-lg">{tag}</div>
              <div className="text-lg text-black">
                {`${((totalExpensesByTag[tag] / totalExpense) * 100).toFixed(2)}%`}
              </div>
            </div>
            <div
              className={`relative bg-gray-200 group-hover:nm-flat-slate-200-lg duration-[300ms] nm-flat-slate-200 rounded-full mb-[10px] h-2 `}
            >
              <div
                className={`bg-gradient-to-r ${colors[index % colors.length][0]} ${
                  colors[index % colors.length][1]
                } absolute left-0 top-0 h-full rounded-full`}
                style={{
                  width: `${(totalExpensesByTag[tag] / totalExpense) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProgressBar;
