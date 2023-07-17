import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BillForm from "../components/bills/BillForm";
import Spinner from "../components/common/Spinner";
import { getBills, reset } from "../features/bills/billSlice";
import DisplayBills from "../components/bills/DisplayBills";
import FilterButton from "../components/dashboard/FIlterButton"
import Header from "../components/nav/Header";
import filterLogo from "../images/filter.png"
import Sidebar from "../components/common/Sidebar";

import subs from "../images/netflix.png"


function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bills, isLoading, isError, message, totalBill } = useSelector(
    (state) => state.bills
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(getBills());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };


  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>

      <section className="nuns-font-700 ml-[3%] text-[24px] mt-[20px]">
        <h1>Streamline Spending: Manage Subscriptions Effortlessly with our Expense Tracker's Subscriptions Page</h1>
      </section>
      <div className="md:mr-8 ml-[3%] md:w-[25%]  md:mb-8 mt-4 nm-flat-slate-200 group hover:nm-flat-slate-200-lg duration-[300ms] text-left  shadow-lg px-2 py-4 rounded-[10px]">
        <div className="ml-2 nuns-font-700 flex items-center">
          <div className="flex items-center">
            <div>
              <h3 className="text-[18px]">Total subs</h3>
              <h1 className="text-[36px] group-hover:scale-[1.08] duration-[300ms]">₹ {totalBill}</h1>
            </div>
          </div>
          <img className="w-[30%] inline mx-auto" src={subs}></img>
        </div>
      </div>


      <DisplayBills bills={bills} />
      <div className="fixed bottom-20 md:bottom-6 right-6 flex items-end justify-end">
        <button
          onClick={openDialog}
          className="nm-flat-slate-300 hover:nm-flat-slate-300-lg duration-[300ms] w-12 h-12 text-2xl rounded-full"
        >
          +
        </button>
        {isDialogOpen && <BillForm onClose={closeDialog} />}
      </div>
    </>
  );
}

export default Dashboard;
