import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import expenses from "../../images/expense-icon.png";
import bills from "../../images/bills.png";
import logoutIcon from "../../images/logout-icon.png";
import savings from "../../images/savings.png";
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
function Sidebar() {
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
    <div className={`sticky top-0 bg-black h-full md:block hidden
     text-white ${isExpanded ? "w-[10%]" : "w-16"}`}>
      <div className="flex items-center justify-between p-4">

        <button
          className="text-gray-400 focus:outline-none focus:text-white"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6 transition-transform transform"
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
      <ul className="flex flex-col items-start h-screen py-2 space-y-2">
        {isExpanded ? (
          <>
            <li className="px-6 py-3 mr-16">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={expenses} alt="Home" className="w-6 h-6" />
                <span>Expense</span>
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link
                to="/savings"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={savings} alt="Savings" className="w-6 h-6" />

                <span>Savings</span>
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link
                to="/bills"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={bills} alt="Bills" className="w-6 h-6" />

                <span>Bills</span>
              </Link>
            </li>
            <li className="px-6 py-3">
              <div

                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:cursor-pointer"
              >
                <img src={logoutIcon} alt="Logout" className="w-6 h-6" onClick={onLogout} />


                <span>Logout</span>
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="mx-auto py-3">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={expenses} alt="Home" className="w-6 h-6" />

              </Link>
            </li>
            <li className="mx-auto py-3">
              <Link
                to="/savings"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={savings} alt="Savings" className="w-6 h-6" />


              </Link>
            </li>
            <li className="mx-auto py-3">
              <Link
                to="/bills"
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <img src={bills} alt="Bills" className="w-6 h-6" />


              </Link>
            </li>
            <li className="mx-auto py-3">
              <div

                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:cursor-pointer"
              >
                <img src={logoutIcon} alt="Logout" className="w-6 h-6" onClick={onLogout} />
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
