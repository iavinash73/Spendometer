import { useDispatch, useSelector } from "react-redux";
import { updateBill } from "../../features/bills/billSlice";
import { useState } from "react";
import arrow from "../../images/Vector.png";
import Datepicker from "react-tailwindcss-datepicker";

function BillItem({ bill, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(bill.title);
  const [cost, setCost] = useState(bill.cost);
  const [duration, setDuration] = useState(bill.duration);
  const [date, setDate] = useState({
    startDate: bill.startingDate,
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const onlyDate = new Date(date.startDate).toDateString();
    dispatch(
      updateBill({
        id: bill._id,
        title: title,
        cost: cost,
        duration: duration,
        date: onlyDate,
        status: bill.status,
      })
    );
    setTitle(bill.title);
    setCost(bill.cost);
    setDuration(bill.duration);
    setDate({ startDate: bill.startingDate });
  };

  const handleValueChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[1]">
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
        <div className="relative w-[80%] sm:w-[60%] md:w-min rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3]">
          <div className="flex relative mb-[20px]">
            <h1 className="text-[18px] nuns-font-700 ">Edit Bill</h1>
            <button
              className="text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]"
              onClick={onClose}
            >
              X
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col text-[16px] nuns-font-500">
              <input
                type="text"
                name="title"
                id="title"
                placeholder={bill.title}
                value={title}
                className="w-full px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms] mb-6"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
                <input
                  type="number"
                  name="cost"
                  id="cost"
                  placeholder={bill.cost}
                  value={cost}
                  className="w-full md:w-56 px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms]"
                  onChange={(e) => setCost(e.target.value)}
                />
                <div className="w-full md:w-56 mt-4 md:mt-0 rounded-[10px]">
                  <Datepicker
                    placeholder={bill.startingDate}
                    useRange={false}
                    asSingle={true}
                    value={date}
                    onChange={handleValueChange}
                  />
                </div>
              </div>
              <input
                type="text"
                name="duration"
                id="duration"
                placeholder={bill.duration}
                value={duration}
                className="w-full md:w-56 px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms] mb-6"
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="flex nuns-font-500 text-[14px] md:text-[16px] items-center">
              <button
                className="bg-black mx-auto px-6 py-2.5 rounded-full text-white  hover:scale-[1.01] duration-[300ms]"
                type="submit"
              >
                Update Bill
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BillItem;
