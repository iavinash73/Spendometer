import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import UpdateItem from "./UpdateItem";
import { deleteSaving, addSaving } from "../../features/savings/savingSlice";
import target from "../../images/target.png";
import deadline from "../../images/deadline.png";
import bin from "../../images/bin.png";
import edit from "../../images/edit.png";
// import "./DisplaySavings.css"; // Import CSS file

function DisplaySavings({ savings }) {
  // const backgroundColors = ["#E3F5FF", "#E5ECF6"];
  const dispatch = useDispatch();
  const progressRef = useRef(null);

  const [sav, setSav] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [st, setst] = useState("");

  const openDialog = (val) => {
    setIsDialogOpen(true);
    setst(val);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (itemId, event) => {
    const value = event.target.value;
    setSav((prevState) => ({
      ...prevState,
      [itemId]: value,
    }));
  };

  useEffect(() => {
    const updateProgressBar = () => {
      const progressElements =
        progressRef.current.getElementsByClassName("progress-bar");
      for (let i = 0; i < progressElements.length; i++) {
        const progressElement = progressElements[i];
        const savedAmount = progressElement.dataset.savedAmount;
        const targetAmount = progressElement.dataset.target;
        const width = `${(savedAmount / targetAmount) * 100}%`;
        progressElement.style.width = width;
      }
    };

    updateProgressBar();
  }, [savings]);

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mt-[20px] ml-[3%] mr-[3%] "
        ref={progressRef}
      >
        {savings.map((specsaving, index) => (
          <div
            key={specsaving._id}
            className={`relative flex flex-col border border-gray-300 shadow-md rounded-[10px] my-[4%] mx-[4%] px-[7%] pt-[2%] pb-[4%] nuns-font-600 text-[16px] focus-within:scale-[1.01] group hover:scale-[1.01] duration-[300ms] bg-[#E5ECF6] }`}
            // style={{ backgroundColor: backgroundColors[index % 2] }}
          >
            <div className="text-[24px] nuns-font-700 my-[3px] duration-[300ms]">
              {specsaving.title}
            </div>
            <div className="my-[3px] duration-[300ms] flex items-center">
              <img src={target} className="inline w-[20px] mr-[5px]" alt="" />
              {specsaving.target}
            </div>
            <div className="my-[3px] duration-[300ms]">
              <span className="text-[17px] nuns-font-700">Saved :</span>
              {specsaving.savedAmount}
            </div>
            {specsaving.isDone ? (
              <div className="my-[3px] text-[18px] nuns-font-600 duration-[300ms]">
                Time to spend your {specsaving.target} now!
              </div>
            ) : (
              <div className="my-[3px] duration-[300ms]">
                <div className="flex items-center">
                  <div className="bg-gray-300 rounded-full h-[6px] w-[70%]">
                    <div
                      className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-full h-[6px] transition-all duration-500 progress-bar"
                      style={{
                        width: `${(specsaving.savedAmount / specsaving.target) * 100
                          }%`,
                      }}
                      data-saved-amount={specsaving.savedAmount}
                      data-target={specsaving.target}
                    ></div>
                  </div>
                  <span className="ml-4">
                    {(
                      (specsaving.savedAmount / specsaving.target) *
                      100
                    ).toFixed(0)}
                    % saved
                  </span>
                </div>
              </div>
            )}
            <div className="my-[4px] duration-[300ms] flex items-center">
              <img src={deadline} className="inline w-[20px] mr-[5px]" alt="" />
              {specsaving.deadline}
            </div>
            <form className="mb-[3px] mt-[5px] duration-[300ms]">
              <div className="text-[15px] nuns-font-500">
                <input
                  type="number"
                  name="saving"
                  id="saving"
                  placeholder={`Add to ${specsaving.title} saving`}
                  value={sav[specsaving._id] || ""}
                  className="px-3 py-1 w-[100%] rounded-[10px] outline-none  duration-[300ms]"
                  onChange={(e) => handleInputChange(specsaving._id, e)}
                />
              </div>
            </form>

            <div className="flex justify-between items-center mt-[10px]">
              <button
                className="w-[20%] bg-black drop-shadow-lg shadow-lg hover:scale-[1.05] duration-[300ms] rounded-[10px] text-white py-1"
                onClick={() => {
                  if (sav[specsaving._id] === undefined) {
                    dispatch(addSaving({ id: specsaving._id, sav: 0 }));
                  } else {
                    dispatch(
                      addSaving({
                        id: specsaving._id,
                        sav: sav[specsaving._id],
                      })
                    );
                  }
                }}
              >
                Add
              </button>
              <div>
                <img
                  src={edit}
                  className="inline w-[22px] ml-[10px] translate-y-[-35%] opacity-0 transform transition duration-[250ms] group-hover:translate-y-0 group-hover:opacity-100 hover:scale-[1.2] hover:cursor-pointer"
                  onClick={() => openDialog(specsaving)}
                  alt=""
                ></img>
                <img
                  src={bin}
                  className="inline w-[22px] ml-[15px] translate-y-[-35%] opacity-0 transform transition duration-[250ms] group-hover:translate-y-0 group-hover:opacity-100 hover:scale-[1.2] hover:cursor-pointer"
                  onClick={() =>
                    dispatch(
                      deleteSaving({
                        id: specsaving._id,
                        savedAmount: specsaving.savedAmount,
                      })
                    )
                  }
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        ))}
        {isDialogOpen && (
          <UpdateItem key={st._id} saving={st} onClose={closeDialog} />
        )}
      </div>
    </>
  );
}

export default DisplaySavings;
