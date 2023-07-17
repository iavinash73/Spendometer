import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import saving from "../../images/piggy-bank.png"
import subs from "../../images/netflix.png"
import ex_this_month from "../../images/expense.png"
import t_expense from "../../images/money.png"
function TotalsBar(expense) {
  const { totalExpense,totalSaving,totalBill } = useSelector((state) => state.expenses);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrame;
    if (count < totalExpense) {
      animationFrame = requestAnimationFrame(() => setCount(count + (1 + count / 2)));
    }
    return () =>
      setCount(totalExpense)
    cancelAnimationFrame(animationFrame);
  }, [count, totalExpense]);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const Month_total_expense = expense.expenses
    .filter(item => new Date(item.date) >= thirtyDaysAgo)
    .reduce((total, item) => total + item.cost, 0);



  return (
    <div className="mb-8 flex mx-8 mt-[30px] nuns-font-700 md:w-[80%] flex-col md:flex-row">
      <div className="md:mr-8 md:w-[25%] nm-flat-slate-200 group hover:nm-flat-slate-200-lg duration-[300ms] text-left shadow-lg px-2 py-4 rounded-[10px] ">
        <div className="ml-2 nuns-font-700 flex items-center">
          <div className="flex items-center">
            <div>
              <h3 className="text-[18px]">Total Expense</h3>
              <h1 className="text-[36px] group-hover:scale-[1.08] duration-[300ms]">₹ {Math.floor(count)}</h1>
            </div>
          </div>
          <img className="w-[30%] h-[30%] inline mx-auto" src={t_expense}></img>
        </div>
      </div>
      <div className="md:mr-8 md:w-[25%]  md:mt-0 mt-4 nm-flat-slate-200 group hover:nm-flat-slate-200-lg duration-[300ms] text-left  shadow-lg px-2 py-4 rounded-[10px]">
        <div className="ml-2 nuns-font-700 flex items-center">
          <div className="flex items-center">
            <div>
              <h3 className="text-[18px]">This month</h3>
              <h1 className="text-[36px] group-hover:scale-[1.08] duration-[300ms]">₹ {Month_total_expense}</h1>
            </div>
          </div>
          <img className="w-[30%] h-[30%] inline mx-auto" src={ex_this_month}></img>
        </div>
      </div>
      <div className="md:mr-8 md:mt-0 mt-4 md:w-[25%] nm-flat-slate-200 group hover:nm-flat-slate-200-lg duration-[300ms] text-left  shadow-lg px-2 py-4 rounded-[10px] ">
        <div className="ml-2 nuns-font-700 flex items-center">
          <div className="flex items-center">
            <div>
              <h3 className="text-[18px]">Total Savings</h3>
              <h1 className="text-[36px] group-hover:scale-[1.08] duration-[300ms]">₹ {totalSaving}</h1>
            </div>
          </div>
          <img className="w-[30%] h-[30%] inline mx-auto" src={saving}></img>
        </div>

      </div>
      <div className="md:mr-8 md:w-[25%]  md:mt-0 mt-4 nm-flat-slate-200 group hover:nm-flat-slate-200-lg duration-[300ms] text-left  shadow-lg px-2 py-4 rounded-[10px]">
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
    </div>
  );
}

export default TotalsBar;
