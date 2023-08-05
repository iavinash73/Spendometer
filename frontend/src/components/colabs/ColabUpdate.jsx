import { useDispatch, useSelector } from "react-redux";
import {
  updateColab,
} from "../../features/colabs/colabSlice";
import { useState } from "react";
import arrow from "../../images/Vector.png";
import Datepicker from "react-tailwindcss-datepicker";

function ColabUpdate({ colabId, colab, onClose }) {
  // console.log(colab)
  const dispatch = useDispatch();
  const [title, setTitle] = useState(colab.title)
  const [desc, setDesc] = useState(colab.desc);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateColab({
        id: colab._id,
        desc: desc,
        title: title,
      })

    );
    setDesc(colab.desc);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[1]">
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
        <div className="relative w-[40%] rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3]">
          <div className="flex relative mb-[23px]">
            <h1 className="text-[18px] nuns-font-700 ">Edit Colab</h1>
            <button
              className=" text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <form onSubmit={onSubmit} >
            <div className="text-[16px] nuns-font-500">
              <input
                type="text"
                name="title"
                id="title"
                placeholder={title}
                value={title}
                className="w-full px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms] mb-6"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                name="desc"
                id="desc"
                placeholder={desc}
                value={desc}
                className="w-full px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms] mb-6"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="flex nuns-font-500 text-[14px] md:text-[16px] items-center">
              <button
                className="bg-black mx-auto px-6 py-2.5 rounded-full text-white  hover:scale-[1.01] duration-[300ms]"
                type="submit"
              >
                Update Colab
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ColabUpdate;
