import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExpenseForm from "../components/dashboard/ExpenseForm";
import Spinner from "../components/common/Spinner";
import { getExpenses, reset } from "../features/expenses/expenseSlice";
import DisplayExpenses from "../components/dashboard/DisplayExpenses";
import TotalsBar from "../components/dashboard/TotalsBar";
import FilterButton from "../components/dashboard/FIlterButton";
import Header from "../components/nav/Header";
import filterLogo from "../images/filter.png";
import ProgressBar from "../components/dashboard/ProgressBar";
import BarChart from "../components/dashboard/BarChart";
import Sidebar from "../components/common/Sidebar";
function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { expenses, isLoading, isError, message } = useSelector(
    (state) => state.expenses
  );
  const { savings, totalSaving } = useSelector((state) => state.savings);
  const data = expenses;
  const [selectedDate, setSelectedDate] = useState("This Month");
  const [selectedTag, setSelectedTag] = useState("All Categories");

  const handleDateSelect = (option) => {
    setSelectedDate(option);
  };

  const handleTagSelect = (option) => {
    setSelectedTag(option);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(getExpenses());

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

  const filteredData = data.filter((item) => {
    const dateFilter =
      selectedDate === "Last 7 Days"
        ? new Date(item.date) >=
        new Date(new Date().setDate(new Date().getDate() - 7))
        : selectedDate === "This Month"
          ? new Date(item.date) >=
          new Date(new Date().setMonth(new Date().getMonth() - 1))
          : true;

    const tagFilter =
      selectedTag === "All Categories" || selectedTag === item.tag;

    return dateFilter && tagFilter;
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="">
      {/* <div className="flex"><Sidebar /></div> */}
        <section className="nuns-font-700 ml-[3%] text-[24px] mt-[30px]">
          <h1><span className="text-[30px] font-bold mr-[10px]">Hey {user && user.name}!</span> Keep track of your money here</h1>
        </section>
        <TotalsBar expenses={data} />
        <div className="flex md:ml-[3%] md:flex-row flex-col">
          <div className=" md:w-[60%]">
            <div className="">
              <div className="inline-block nuns-font-700 text-[20px] md:mr-[20px] md:ml-0 ml-8">
                Filter
                <img src={filterLogo} className="w-[15px] inline mx-[5px]"></img>:
              </div>
              <FilterButton
                options={["Last 7 Days", "This Month", "View All"]}
                onSelect={handleDateSelect}
                initialValue={selectedDate}
              />
              <FilterButton
                options={["All Categories", "Food", "Movie", "Travel","Medical","Shopping","Grocery"]}
                onSelect={handleTagSelect}
                initialValue={selectedTag}
              />
            </div>
            <DisplayExpenses expenses={filteredData} />
          </div>
          <div className="md:w-[33%] mx-[3%] md:mx-8">
            <ProgressBar expenses={data} />
            <BarChart expenses={expenses} />
          </div>

        </div>
        <div className="fixed md:bottom-6 right-6 bottom-20  flex items-end justify-end">
          <button
            onClick={openDialog}
            className="nm-flat-slate-300 hover:nm-flat-slate-300-lg duration-[300ms] w-12 h-12 text-2xl rounded-full"
          >
            +
          </button>
          {isDialogOpen && <ExpenseForm onClose={closeDialog} />}
        </div>
      </div>
  );
}

export default Dashboard;
