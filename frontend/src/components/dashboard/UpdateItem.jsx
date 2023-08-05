import { useDispatch, useSelector } from "react-redux";
import {
  updateExpense,
} from "../../features/expenses/expenseSlice";
import { useState } from "react";
import arrow from "../../images/Vector.png";
import Datepicker from "react-tailwindcss-datepicker";

function ExpenseItem({ expense, onClose }) {
  // console.log(expense) 
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(expense.desc);
  const [editedCost, setEditedCost] = useState(expense.cost);
  const [tag, setTag] = useState(expense.tag);
  const [mode, setMode] = useState(expense.mode);
  const [date, setDate] = useState({
    startDate: expense.date,
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const onlyDate = new Date(date.startDate).toDateString();
    dispatch(
      updateExpense({
        id: expense._id,
        desc: desc,
        cost: editedCost,
        tag: tag,
        mode: mode,
        date: onlyDate,
      })
    );
    setDesc(expense.desc);
    setEditedCost(expense.cost);
    setTag(expense.tag);
    setMode(expense.mode);
    setDate({ startDate: expense.date });
  };
  const handleValueChange = (newDate) => {
    setDate(newDate);
  };
  const [selectedOption, setSelectedOption] = useState(expense.tag);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTag(option)
    setDropdownOpen(false);
  };


  function Dropdown({ selectedOption, isDropdownOpen, handleOptionSelect }) {
    const options = ["All Categories", "Food", "Movie", "Travel", "Medical", "Shopping"];
    return (
      <div className="">
        <div className="relative w-56 px-4 py-2.5 ring ring-1 ring-gray-500 rounded-[10px] outline-none  duration-[300ms]" onClick={() => setDropdownOpen(!isDropdownOpen)}>
          {selectedOption || "Add tag"}
          <span className="absolute right-[10px]">
            <img
              src={arrow}
              className={`w-[7px] inline ml-3 mr-2 duration-[300ms] ${isDropdownOpen ? "rotate-[270deg]" : "rotate-[90deg]"} `}
            />
          </span>
        </div>
        {isDropdownOpen && (
          <ul className="absolute text-gray-700 hover:text-black mt-2 w-fit rounded-[10px] bg-white shadow-lg ">
            {options.map((option) => (
              <li className={`w-56 text-center cursor-pointer px-4 py-2 hover:bg-gray-200  duration-[300ms] rounded-[10px] ${selectedOption === option ? "" : ""
                }`} key={option} onClick={() => handleOptionSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[1] ">
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
        <div className="relative rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6">
          <div className="flex relative mb-[12px]">
            <h1 className="text-[18px] nuns-font-700 ">Edit Expense</h1>
            <button
              className=" text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]"
              onClick={onClose}
            >
              X
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col text-[16px] nuns-font-500">
              <input
                type="text"
                name="desc"
                id="desc"
                placeholder={expense.desc}
                value={desc}
                className="w-full px-4 py-2.5 rounded-[10px] outline-none duration-[300ms] mb-6"
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="flex mb-6">
                <input
                  type="number"
                  name="cost"
                  id="cost"
                  placeholder={expense.cost}
                  value={editedCost}
                  className="w-56 px-4 py-2.5 mr-6 rounded-[10px] outline-none duration-[300ms]"
                  onChange={(e) => setEditedCost(e.target.value)}
                />
                <div className="w-56 flex items-center rounded-[10px]">
                  <Datepicker
                    placeholder={expense.date}
                    useRange={false}
                    asSingle={true}
                    value={date}
                    onChange={handleValueChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="">
                  <input
                    type="text"
                    name="mode"
                    id="mode"
                    placeholder={expense.mode}
                    value={mode}
                    className="w-56 px-4 py-2.5 mr-6 rounded-[10px]  duration-[300ms] outline-none"
                    onChange={(e) => setMode(e.target.value)}
                  />
                </div>
                <Dropdown
                  selectedOption={selectedOption}
                  isDropdownOpen={isDropdownOpen}
                  handleOptionSelect={handleOptionSelect}
                />
                {/* <input
                type="text"
                name="tag"
                id="tag"
                placeholder="Add tag"
                value={tag}
                className="w-56 px-4 py-2.5  rounded-[10px] outline-none nm-inset-gray-200 focus:nm-inset-gray-200-lg duration-[300ms]"
                onChange={(e) => setTag(e.target.value)}
              /> */}
              </div>
            </div>

            <div className="mt-6 flex nuns-font-500 text-[16px] items-center">
              <button
                className="bg-black mx-auto px-6 py-2.5 rounded-full text-white  hover:scale-[1.01] duration-[300ms]"
                type="submit"
              >
                Update Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ExpenseItem;
