import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createColab,
} from "../../features/colabs/colabSlice";
import arrow from "../../images/Vector.png";
import Datepicker from "react-tailwindcss-datepicker";
function ColabForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState();
  const [desc, setDesc] = useState();

//   const [savedAmount, setSavedAmount] = useState("");
//   const [deadline, setDeadline] = useState({
//     startDate: null,
//   });
  // console.log(typeof(date.startDate))
//   let onlyDate = new Date(deadline.startDate).toDateString();
//   const handleValueChange = (newDate) => {
//     setDeadline(newDate);
//   };
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log({ title, users });
    // const usersJsonString = JSON.stringify({ title, users });
    // console.log(usersJsonString)
    dispatch(createColab({ title, email,desc }));
    setTitle("");
    setEmail("");
    // setSavedAmount("");
    onClose()
  };


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
      <div className="relative w-[80%] sm:w-[60%] md:w-[35%] rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3]">
        <div className="flex relative mb-[23px]">
          <h1 className="text-[18px] nuns-font-700  ">Add Colab</h1>
          <button className=" text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]" onClick={onClose}>
            X
          </button>
        </div>

        <form >
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
            <div className="flex flex-col md:space-x-4 mb-6">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Add User"
                value={email}
                className="w-full px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms]"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:space-x-4 mb-6">
              <input
                type="text"
                name="desc"
                id="desc"
                placeholder="Add Desc"
                value={desc}
                className="w-full px-4 py-2.5 rounded-[10px] outline-none duration-[300ms]"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <div className="flex nuns-font-500 text-[14px] md:text-[16px] items-center">
            <button
              className="bg-black mx-auto px-6 py-2.5 rounded-full text-white  hover:scale-[1.01] duration-[300ms]" onClick={onSubmit}
            >
              Add Colab
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ColabForm;
