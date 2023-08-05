// ColabDetails.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserColab, removeUserColab, deleteExpense } from "../../features/colabs/colabSlice";
import ExpForm from "./ExpenseAdd";
import ima from "../../images/tags/shopping.png"
import travel from "../../images/tags/travel.png"
import ExpenseUpdate from "./ExpenseUpdate";
import AddUserForm from "./AddUserForm";
import addUserIcon from "../../images/add user.png";
import movieIcon from "../../images/tags/movie.png";
import foodIcon from "../../images/tags/food.png"
// import groceryIcon from "../../images/tags/grocery.png"
import healthIcon from "../../images/tags/health.png"
import viewAll from "../../images/tags/viewall.png"
import bin from "../../images/bin.png";
import edit from "../../images/edit.png";

const ColabDetails = ({ colab }) => {
    const dispatch = useDispatch();
    // const [sav, setSav] = useState("");
    const [del, setDel] = useState("");
    const [isExpOpen, setIsExpOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isExpUpdateOpen, setIsExpUpdateOpen] = useState(false);
    const [UpdateData, setUpdateData] = useState(null)
    const [removeUserDialog, setremoveUserDialog] = useState(false)
    const openRemoveUser = () => {
        setremoveUserDialog(true)
    }
    const closeRemoveUser = () => {
        setremoveUserDialog(false)
    }
    const openDialog1 = () => {
        setIsExpOpen(true);
    };
    const closeDialog1 = () => {
        setIsExpOpen(false);
    };
    const openDialog2 = () => {
        setIsExpUpdateOpen(true);
    };
    const closeDialog2 = () => {
        setIsExpUpdateOpen(false);
    };
    const openDialog3 = () => {
        setIsAddOpen(true);
    };
    const closeDialog3 = () => {
        setIsAddOpen(false);
    };


    const handleRemoveUser = () => {
        dispatch(removeUserColab({ id: colab._id, email: del }));
        setDel("");
    };
    const tagToImage = {
        "All Categories": viewAll,
        "Food": foodIcon,
        "Movie": movieIcon,
        "Travel": travel,
        "Medical": healthIcon,
        "Shopping": ima,
    };

    return (

        <div className="ml-[2%] w-[38%] bg-white rounded-[10px] p-4">

            <div className="flex ">
                <div className="text-[32px] nuns-font-700 w-[50%] ">Expenses</div>
                <div className="my-[3px] duration-[300ms]">
                    <div className="flex items-center" >
                        <button className="flex  -space-x-4" onClick={() => { openRemoveUser() }}>
                            {colab.users.map((user) => (
                                <>
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover" src={user.image} alt="" />

                                </>
                            ))}
                        </button>
                        <button onClick={() => { openDialog3() }}>
                            <img src={addUserIcon} className="w-8 hover:scale-[1.1] duration-[300ms]" />

                        </button>
                    </div>
                </div>

            </div>
            <div className="">
                <button
                    onClick={() => { openDialog1(); }}
                    className=" text-[15px] nuns-font-600 duration-[300ms] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] shadow-lg rounded-md px-4 py-2 my-4"
                >
                    Add Expense
                </button>
                {isExpOpen && <ExpForm id={colab._id} onClose={closeDialog1} />}

            </div>

            <div className="my-[3px] duration-[300ms]">
                {colab.expense.map((expense) => (
                    <div className="flex rounded-[10px] nuns-font-500 my-2 group hover:scale-[1.02] duration-[300ms]">
                        <div className="w-[10%] flex mx-4 my-2 items-center justify-center">
                            <img
                                src={tagToImage[expense.tag]}
                                alt={expense.tag}
                                className=" w-16  object-cover"
                            />
                        </div>
                        <div className="w-[70%] my-auto">
                            <div key={expense._id} className="nuns-font-700">{expense.desc} </div>
                            <div className="text-gray-500 text-[15px]">
                                <span>{expense.date}</span>
                                {/* <span className="ml-4">{expense.tag}</span> */}
                            </div>
                        </div>
                        <div className="w-[20%] nuns-font-700 my-auto">
                            - Rs.{expense.cost}
                            <div className="ml-[10px] mt-[5px] translate-y-[-35%] opacity-0 transform transition duration-[300ms] group-hover:translate-y-0 group-hover:opacity-100 ">
                                <button
                                    onClick={() => { setUpdateData(expense); openDialog2(); }}
                                    className="duration-[300ms] mr-[10px]"
                                >
                                    <img src={edit} className="w-[17px] hover:scale-[1.2] hover:cursor-pointer duration-[300ms]" />

                                </button>
                                <button
                                    onClick={() => { dispatch(deleteExpense({ expenseId: expense._id, colabId: colab._id })) }}
                                    className=" duration-[300ms]"

                                >
                                    <img src={bin} className="w-[17px] hover:scale-[1.2] hover:cursor-pointer duration-[300ms]" />

                                </button>

                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <form className="mb-3 mt-5">
                <div className="flex items-center">
                    {/* <input
                        type="text"
                        name="user"
                        id="user"
                        placeholder={`Add user to ${colab.title} colab`}
                        value={sav}
                        className="px-4 py-2 w-[70%] rounded-[10px] outline-none nm-inset-gray-300 focus:nm-inset-gray-300-lg duration-[300ms]"
                        onChange={(e) => setSav(e.target.value)}
                    /> */}
                    {/* <button
                        type="button"
                        className="w-[30%] bg-black drop-shadow-lg shadow-lg ml-3 text-white py-1 rounded-[10px]"
                        onClick={() => { openDialog3() }}
                    >
                        Add User
                    </button> */}
                </div>
            </form>
            {removeUserDialog === true ? (<div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[1]">
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
                <div className="relative w-[80%] sm:w-[60%] md:w-[35%] rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3]">
                    <div className="flex relative mb-[12px]">
                        <h1 className="text-[18px] nuns-font-700 ">Remove User</h1>
                        <button className=" text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]" onClick={closeRemoveUser}>
                            X
                        </button>
                    </div>

                    <form className="mb-3 mt-5">
                        <div className="flex items-center">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder={`Remove user from ${colab.title} colab`}
                                value={del}
                                className="px-4 py-2 w-[70%] rounded-[10px] outline-none duration-[300ms] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] shadow-lg duration-[300ms]"
                                onChange={(e) => setDel(e.target.value)}
                            />
                            <button
                                type="button"
                                className="w-[30%] bg-black drop-shadow-lg shadow-lg ml-3 py-2 text-white rounded-[10px]"
                                onClick={handleRemoveUser}
                            >
                                Remove User
                            </button>
                        </div>
                    </form>
                </div>
            </div>) : ("")}


            {isExpUpdateOpen && <ExpenseUpdate colabId={colab._id} expense={UpdateData} onClose={closeDialog2} />}
            {isAddOpen && <AddUserForm colabId={colab._id} onClose={closeDialog3} />}
        </div>
    );
};

export default ColabDetails;
