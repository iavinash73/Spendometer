import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSaving,
} from "../../features/savings/savingSlice";
import arrow from "../../images/Vector.png";
import Datepicker from "react-tailwindcss-datepicker";
function SavingForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState();
  const [savedAmount, setSavedAmount] = useState("");
  const [deadline, setDeadline] = useState({
    startDate: null,
  });
  // console.log(typeof(date.startDate))
  let onlyDate = new Date(deadline.startDate).toDateString();
  const handleValueChange = (newDate) => {
    setDeadline(newDate);
  };
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ title, target, onlyDate });
    dispatch(createSaving({ title, target, onlyDate }));
    setTitle("");
    setTarget(0);
    setSavedAmount("");
    onClose()
  };


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
      <div className="relative w-[80%] sm:w-[60%] md:w-min rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3]">
        <div className="flex relative mb-[23px]">
          <h1 className="text-[18px] nuns-font-700 ">Create Savings</h1>
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
              className="w-full px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms] mb-6"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
              <input
                type="number"
                name="target"
                id="target"
                placeholder="Set Target Amount"
                value={target}
                className="w-full md:w-56 px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms]"
                onChange={(e) => setTarget(e.target.value)}
              />
              <div className="w-full md:w-56 mt-4 md:mt-0 rounded-[10px] ">
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  value={deadline}
                  onChange={handleValueChange}
                />
              </div>
            </div>
          </div>
          <div className="flex nuns-font-500 text-[14px] md:text-[16px] items-center">
            <button
              className="bg-black mx-auto px-6 py-2.5 rounded-full text-white  hover:scale-[1.01] duration-[300ms] "
            >
              Create Savings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SavingForm;
