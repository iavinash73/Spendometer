import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserColab, deleteExpense } from "../../features/colabs/colabSlice";
function AddUserForm({ colabId,onClose }) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addUserColab({ id: colabId, user: email }));
    onClose()
  };


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[1]">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
      <div className="relative w-[80%] sm:w-[60%] md:w-[35%] rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3]">
        <div className="flex relative mb-[15px]">
          <h1 className="text-[18px] nuns-font-700 ">Add User</h1>
          <button className=" text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]" onClick={onClose}>
            X
          </button>
        </div>

        <form >
          <div className="flex flex-col text-[16px] nuns-font-500">
            <input
              type="email"
              name="mail"
              id="mail"
              placeholder="Enter user mail id"
              value={email}
              className="w-full px-4 py-2.5 rounded-[10px] outline-none duration-[300ms] mb-6"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex nuns-font-500 text-[14px] md:text-[16px] items-center">
            <button
              className="bg-black mx-auto px-6 py-2.5 rounded-full text-white  hover:scale-[1.01] duration-[300ms]" onClick={onSubmit}
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
