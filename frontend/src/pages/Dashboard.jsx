import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import BarChart from "../components/dashboard/BarChart";
import DisplayExpenses from "../components/dashboard/DisplayExpenses";
import ExpenseForm from "../components/dashboard/ExpenseForm";
import FilterButton from "../components/dashboard/FIlterButton";
import ProgressBar from "../components/dashboard/ProgressBar";
import TotalsBar from "../components/dashboard/TotalsBar";
import { getExpenses, reset } from "../features/expenses/expenseSlice";
import filterLogo from "../images/filter.png";
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
  const [selectedDate, setSelectedDate] = useState("View All");
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
      {user ? <div className="absolute top-4 right-4"><img src={user.image} className="w-14 h-14 rounded-full object-cover hover:scale-[1.1] duration-[300ms]"></img></div> : ""}

      {/* <div className="flex"><Sidebar /></div> */}
      <section className="nuns-font-700 ml-[3%] text-[24px] mt-[30px]">
        <h1><span className="text-[30px] font-bold mr-[10px]">Hey {user && user.name}!</span> Keep track of your money here</h1>
      </section>
      <TotalsBar expenses={data} />
      {expenses.length == 0 ? <div className="nuns-font-600 text-[20px] text-center mt-[6%]">Add your expenses here</div> :
        <div className="flex md:ml-[3%] md:flex-row flex-col">
          <div className=" md:w-[65%]">
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
                options={["All Categories", "Food", "Movie", "Travel", "Medical", "Shopping"]}
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

        </div>}

      <div className="fixed md:bottom-6 right-6 bottom-20  flex items-end justify-end">
        <button
          onClick={openDialog}
          className=" duration-[300ms] bg-white hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] shadow-lg w-12 h-12 text-2xl rounded-full"
        >
          +
        </button>
        {isDialogOpen && <ExpenseForm onClose={closeDialog} />}
      </div>
    </div>
  );
}

export default Dashboard;
