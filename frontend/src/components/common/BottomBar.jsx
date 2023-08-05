import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import bills from "../../images/bills.png"
import expenses from "../../images/expense-icon.png"
import savings from "../../images/savings.png"
import logoutIcon from "../../images/logout-icon.png"
import colab from "../../images/colab.png"
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
function BottomNavigationBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
      }
    
  return (
    <nav className="z-[1]  md:hidden fixed bottom-0 left-0 right-0 bg-black text-white flex justify-between items-center py-4 px-6">
       <Link to="/dashboard" className="">
        <img src={expenses} alt="Home" className="w-6 h-6 hover:scale-[1.2] duration-[300ms]" />
      </Link>
      <Link to="/colabs" className="">
        <img src={colab} alt="Colabs" className="w-8 h-8 hover:scale-[1.2] duration-[300ms]" />
      </Link>
      <Link to="/savings" className="">
        <img src={savings} alt="Savings" className="w-6 h-6 hover:scale-[1.2] duration-[300ms]"  />
      </Link>
      <Link to="/bills" className="">
        <img src={bills} alt="Bills" className="w-6 h-6 hover:scale-[1.2] duration-[300ms]" />
      </Link>
     <div>
        <img src={logoutIcon} alt="Logout" className="w-6 h-6 hover:scale-[1.2] duration-[300ms]" onClick={onLogout} />
      </div>
    </nav>
  );
}

export default BottomNavigationBar;