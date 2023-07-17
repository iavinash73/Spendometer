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

      <section className="nuns-font-700 ml-[3%] text-[24px] mt-[30px]">
        <h1>Save Smarter, Track better</h1>
      </section>

      <DisplaySavings savings={savings} />
      <div className="fixed bottom-20 md:bottom-6 right-6 flex items-end justify-end">
        <button
          onClick={openDialog}
          className="nm-flat-slate-300 hover:nm-flat-slate-300-lg duration-[300ms] w-12 h-12 text-2xl rounded-full"
        >
          +
        </button>
        {isDialogOpen && <SavingForm onClose={closeDialog} />}
      </div>
    </>
  );
}

export default Dashboard;
