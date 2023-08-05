import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createBill,
} from "../../features/bills/billSlice";
import arrow from "../../images/Vector.png";
import Datepicker from "react-tailwindcss-datepicker";
function GoalForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState();
  const [duration, setDuration] = useState();
  const [startingDate, setStartingDate] = useState({
    startDate: null,
  });

  // console.log(typeof(date.startDate))
  let onlyDate = new Date(startingDate.startDate).toDateString();
  const handleValueChange = (newDate) => {
    setStartingDate(newDate);
  };
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createBill({ title, cost, duration, onlyDate, status: true }));
    setTitle("");
    setCost(0);
    setDuration();
    onClose();
  };
  



  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
      <div className="relative w-[80%] sm:w-[60%] md:w-min rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3]">
        <div className="flex relative mb-[15px]">
          <h1 className="text-[18px] nuns-font-700 ">Add Bill</h1>
          <button className=" text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]" onClick={onClose}>
            X
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col text-[16px] nuns-font-500">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Add Title"
              value={title}
              className="w-full px-4 py-2.5 rounded-[10px] outline-none duration-[300ms] mb-6"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
              <input
                type="number"
                name="cost"
                id="cost"
                placeholder="Add cost"
                value={cost}
                className="w-full md:w-56 px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms]"
                onChange={(e) => setCost(e.target.value)}
              />
              <div className="w-full md:w-56 mt-4 md:mt-0 rounded-[10px]">
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  value={startingDate}
                  onChange={handleValueChange}
                />
              </div>
            </div>
              <input
                type="number"
                name="duration"
                id="duration"
                placeholder="Add no of months"
                value={duration}
                className="w-full md:w-56 px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms] mb-6"
                onChange={(e) => setDuration(e.target.value)}
              />
              {/* <Dropdown
                selectedOption={selectedOption}
                isDropdownOpen={isDropdownOpen}
                handleOptionSelect={handleOptionSelect}
              /> */}
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

          <div className="flex nuns-font-500 text-[14px] md:text-[16px] items-center">
            <button
              className="bg-black mx-auto px-6 py-2.5 rounded-full text-white  hover:scale-[1.01] duration-[300ms]"
            >
              Add Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GoalForm;
