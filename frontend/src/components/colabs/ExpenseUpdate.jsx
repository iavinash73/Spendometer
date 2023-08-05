import { useDispatch, useSelector } from "react-redux";
import {
  updateExpense,
} from "../../features/colabs/colabSlice";
import { useState } from "react";
import arrow from "../../images/Vector.png";
import Datepicker from "react-tailwindcss-datepicker";

function ColabUpdate({ colabId, expense, onClose }) {
  console.log(expense)
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(expense.desc);
  const [cost, setCost] = useState(expense.cost);
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
        CID: colabId,
        id: expense._id,
        desc: desc,
        cost: cost,
        tag: tag,
        mode: mode,
        date: onlyDate,
      })

    );
    setDesc(expense.desc);
    setCost(expense.cost);
    setTag(expense.tag);
    setMode(expense.mode);
    setDate({ startDate: expense.date });

    // setTarget(saving.target);
    // setDate({ startDate: saving.deadline });
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
      <div className="w-56">
        <div className="relative w-56 px-4 py-2.5 ring ring-1 ring-gray-500 rounded-[10px] outline-none duration-[300ms]" onClick={() => setDropdownOpen(!isDropdownOpen)}> {selectedOption || "Add tag"}
          <span className="absolute right-[10px]">
            <img
              src={arrow}
              className={`w-[7px] inline ml-3 mr-2 duration-[300ms] ${isDropdownOpen ? "rotate-[270deg]" : "rotate-[90deg]"} `}
            /></span>
        </div>
        {isDropdownOpen && (
          <ul className="absolute mt-2 text-gray-700 hover:text-black py-1 w-fit rounded-[10px]  shadow-lg ">
            {options.map((option) => (
              <li className={`w-56 text-center cursor-pointer px-4 py-2  duration-[300ms] rounded-[10px] ${selectedOption === option ? "" : ""
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
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[1]">
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
        <div className="relative w-[80%] sm:w-[60%] md:w-min rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3]">
          <div className="flex relative mb-[23px]">
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
                placeholder="Add description"
                value={desc}
                className="w-full px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms] mb-6"
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="flex mb-6">
                <input
                  type="number"
                  name="cost"
                  id="cost"
                  placeholder="Add cost"
                  value={cost}
                  className="w-56 px-4 py-2.5 mr-6 rounded-[10px] outline-none duration-[300ms]"
                  onChange={(e) => setCost(e.target.value)}
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
                <input
                  type="text"
                  name="mode"
                  id="mode"
                  placeholder="Add mode of transaction"
                  value={mode}
                  className="w-56 px-4 py-2.5 mr-6 rounded-[10px] duration-[300ms] outline-none"
                  onChange={(e) => setMode(e.target.value)}
                />
                <Dropdown
                  selectedOption={selectedOption}
                  isDropdownOpen={isDropdownOpen}
                  handleOptionSelect={handleOptionSelect}
                />
              </div>
            </div>

            <div className="flex nuns-font-500 text-[14px] md:text-[16px] items-center mt-8">
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

export default ColabUpdate;
