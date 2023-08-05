import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../components/common/Spinner";
import { getSavings, reset } from "../features/savings/savingSlice";
import DisplaySavings from "../components/savings/DisplaySavings";
import TotalsBar from "../components/dashboard/TotalsBar";
import FilterButton from "../components/dashboard/FIlterButton"
import Header from "../components/nav/Header";
import filterLogo from "../images/filter.png"
import SavingForm from "../components/savings/savingForm";
import Sidebar from "../components/common/Sidebar";

function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { savings, isLoading, isError, message, totalSaving } = useSelector(
    (state) => state.savings
  );

  const { totalExpense } = useSelector(
    (state) => state.expenses
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(getSavings());

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
    <div className="absolute top-4 right-4"><img src={user.image} className="w-14 h-14 rounded-full object-cover hover:scale-[1.1] duration-[300ms]"></img></div>

      <section className="nuns-font-700 ml-[3%] text-[24px] mt-[30px]">
        <h1>Save Smarter, Track better</h1>
      </section>

      <DisplaySavings savings={savings} />
      <div className="fixed bottom-20 md:bottom-6 right-6 flex items-end justify-end">
        <button
          onClick={openDialog}
          className="hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] shadow-lg duration-[300ms] w-12 h-12 text-2xl bg-white rounded-full"
        >
          +
        </button>
        {isDialogOpen && <SavingForm onClose={closeDialog} />}
      </div>
    </>
  );
}

export default Dashboard;
