import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../../features/auth/authSlice';
import bills from "../../images/bills.png";
import colab from "../../images/colab.png";
import expenses from "../../images/expense-icon.png";
import logoutIcon from "../../images/logout-icon.png";
import savings from "../../images/savings.png";
function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  // console.log(user)
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className={`sticky top-0  nun-font-500 bg-black h-screen md:block hidden
      text-white duration-[300ms] ${isExpanded ? "w-[10%] expanded" : "w-16 collapsed"}`}>
      <div className="absolute top-0 p-4">
        <button
          className="text-gray-400 focus:outline-none focus:text-white"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6 transition-transform transform hover:scale-[1.2] duration-[300ms]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isExpanded ? (
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>

      {isExpanded ? (
        <>
          <ul className="flex flex-col items-start h-screen py-2  space-y-2 justify-center mr-14">
            <li className="px-4 py-6 hover:scale-[1.1] duration-[300ms]">
              <Link
                to="/dashboard"
                className="flex items-center space-x-4 text-gray-300 hover:text-white"
              >
                <img src={expenses} alt="Home" className="w-6 h-6" />
                <span>Expense</span>
              </Link>
            </li>
            <li className="pl-2 pr-4 py-6 hover:scale-[1.1] duration-[300ms]">
              <Link
                to="/colabs"
                className="flex items-center space-x-4 text-gray-300 hover:text-white"
              >
                <img src={colab} alt="Bills" className="w-8 h-8" />

                <span>Colab</span>
              </Link>
            </li>
            <li className="px-4 py-6 hover:scale-[1.1] duration-[300ms]">
              <Link
                to="/savings"
                className="flex items-center space-x-4 text-gray-300 hover:text-white"
              >
                <img src={savings} alt="Savings" className="w-6 h-6" />

                <span>Savings</span>
              </Link>
            </li>

            <li className="px-4 py-6 hover:scale-[1.1] duration-[300ms]">
              <Link
                to="/bills"
                className="flex items-center space-x-4 text-gray-300 hover:text-white"
              >
                <img src={bills} alt="Bills" className="w-6 h-6" />

                <span>Bills</span>
              </Link>
            </li>

          </ul>
          {/* <img src={user.image} className="w-10 h-10"></img> */}

          <div

            className="py-3 absolute bottom-0 left-5 flex items-center space-x-2 text-gray-300 hover:text-white hover:cursor-pointer hover:scale-[1.1] duration-[300ms]"
          >
            <img src={logoutIcon} alt="Logout" className="w-6 h-6 " onClick={onLogout} />


            <span>Logout</span>
          </div>


        </>
      ) : (
        <>
          <ul className="flex flex-col items-start w-16 h-screen py-2 space-y-2 justify-center">
            <li className="px-4 py-6 hover:scale-[1.2] duration-[300ms]">
              <Link
                to="/dashboard"
                className=" items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={expenses} alt="Home" className="w-6 h-6" />

              </Link>
            </li>
            <li className="pl-2 pr-4 py-6 hover:scale-[1.2] duration-[300ms]">
              <Link
                to="/colabs"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={colab} alt="Colab" className="w-8 h-8" />
              </Link>
            </li>
            <li className="px-4 py-6 hover:scale-[1.2] duration-[300ms]">
              <Link
                to="/savings"
                className=" items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={savings} alt="Savings" className="w-6 h-6" />


              </Link>
            </li>

            <li className="px-4 py-6 hover:scale-[1.2] duration-[300ms]">
              <Link
                to="/bills"
                className=" items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={bills} alt="Bills" className="w-6 h-6" />


              </Link>
            </li>

          </ul>

          {/* <div

            className="py-3 absolute bottom-12 left-5  space-x-2 text-gray-300 hover:text-white hover:cursor-pointer"
          >
            <img src={user.image} className="w-8 h-8"></img>
          </div> */}
          <div

            className="py-3 absolute bottom-0 left-5  space-x-2 text-gray-300 hover:text-white hover:cursor-pointer"
          >
            <img src={logoutIcon} alt="Logout" className="w-6 h-6 hover:scale-[1.2] duration-[300ms]" onClick={onLogout} />
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
