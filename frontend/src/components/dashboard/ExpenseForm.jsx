import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createExpense,
} from "../../features/expenses/expenseSlice";
import arrow from "../../images/Vector.png";
import Datepicker from "react-tailwindcss-datepicker";
function GoalForm({ onClose }) {
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState();
  const [tag, setTag] = useState("");
  const [mode, setMode] = useState("");
  const [date, setDate] = useState({
    startDate: null,
  });
  // console.log(typeof(date.startDate))
  let onlyDate = new Date(date.startDate).toDateString();
  const handleValueChange = (newDate) => {
    setDate(newDate);
  };
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createExpense({ desc, cost, tag, mode, onlyDate }));
    setDesc("");
    setCost(0);
    setTag("");
    setMode("");
    onClose()
  };
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTag(option)
    setDropdownOpen(false);
  };


  function Dropdown({ selectedOption, isDropdownOpen, handleOptionSelect }) {
    const options = ["All Categories", "Food", "Movie", "Travel","Medical","Shopping"];
    return (
      <div className="w-56">

        <div className="relative w-56 px-4 py-2.5 ring ring-1 ring-gray-500 rounded-[10px] outline-none  duration-[300ms]" onClick={() => setDropdownOpen(!isDropdownOpen)}> {selectedOption || "Add tag"}
          <span className="absolute right-[10px]">
            <img
              src={arrow}
              className={`w-[7px] inline ml-3 mr-2 duration-[300ms] ${isDropdownOpen ? "rotate-[270deg]" : "rotate-[90deg]"} `}
            /></span>
        </div>
        {isDropdownOpen && (
          <ul className="absolute mt-2 text-gray-700 hover:text-black bg-white py-1 w-fit rounded-[10px]  shadow-lg ">
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
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
      <div className="rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3]">
        <div className="flex relative mb-[12px]">
          <h1 className="text-[18px] nuns-font-700 ">Add Expense</h1>
          <button className=" text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]" onClick={onClose}>
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
              {/* <input
                type="text"
                name="tag"
                id="tag"
                placeholder="Add tag"
                value={tag}
                className="w-56 px-4 py-2.5  rounded-[10px] outline-none nm-inset-gray-300 focus:nm-inset-gray-300-lg duration-[300ms]"
                onChange={(e) => setTag(e.target.value)}
              /> */}
            </div>

          </div>

          <div className="mt-6 flex nuns-font-500 text-[16px] items-center">
            <button
              className="bg-black mx-auto px-6 py-2.5 rounded-full text-white  hover:scale-[1.01] duration-[300ms] "
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GoalForm;
