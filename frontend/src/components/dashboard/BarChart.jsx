import React, { useEffect, useState } from 'react';

const ExpenseBarChart = ({ expenses }) => {
    const [hoveredWeekTotal, setHoveredWeekTotal] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [maxTotalExpense, setMaxTotalExpense] = useState(0);


    // const handleBarMouseLeave = () => {
    //     setTooltipExpense(null);
    // };
    // const handleBarMouseMove = (event, index) => {
    //     const rect = event.currentTarget.getBoundingClientRect();
    //     const x = rect.right - event.clientX; // Calculate relative to right edge
    //     const y = rect.bottom - event.clientY; // Calculate relative to bottom edge
    //     setTooltipPosition({ x, y });
    //     setTooltipExpense(chartData[index].total.toFixed(2));
    // };
    const handleBarMouseEnter = (index) => {
        setHoveredWeekTotal(chartData[index].total.toFixed(1));

    };

    const handleBarMouseLeave = () => {
        setHoveredWeekTotal(null);
    };
    useEffect(() => {
        // Function to group expenses by week and calculate total expense for each week
        const groupExpensesByWeek = (expenses) => {
            const today = new Date();
            const lastFourWeeks = [...Array(4)].map((_, i) => {
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - i * 7);
                startOfWeek.setHours(0, 0, 0, 0);
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                return {
                    start: startOfWeek,
                    end: endOfWeek,
                    total: 0,
                };
            });

            expenses.forEach((expense) => {
                const expenseDate = new Date(expense.date);
                lastFourWeeks.forEach((week) => {
                    if (expenseDate >= week.start && expenseDate <= week.end) {
                        week.total += expense.cost;
                    }
                });
            });

            // Calculate the maximum total expense
            const maxTotal = Math.max(...lastFourWeeks.map((week) => week.total));
            setMaxTotalExpense(maxTotal);

            return lastFourWeeks;
        };

        const lastFourWeeksData = groupExpensesByWeek(expenses);

        setChartData(lastFourWeeksData);
    }, [expenses]);

    return (<>
        <div className="w-full max-w-md mx-auto mb-4">
            <div className={`flex text-gray-500 px-4 ${hoveredWeekTotal !== null ? "justify-between" : "justify-end"}`}>
                {/* <span>Total Expense: {hoveredWeekTotal}</span> */}
                {hoveredWeekTotal !== null && (
                    <span className="text-black inline rounded-md px-2 nuns-font-700">
                        Expense: <span className='nuns-font-500'>{hoveredWeekTotal}</span>
                    </span>
                )}
                <div>Weekly Activity </div>
            </div>
            <hr className='mt-3 mb-6 mx-4' />
            <div className="flex justify-between px-6">
                {chartData.map((week, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-end group"
                        onMouseEnter={() => handleBarMouseEnter(index)}
                        onMouseLeave={handleBarMouseLeave}
                    >
                        <div className="w-2 bg-[#F2F7FF] flex flex-col rounded-[10px] justify-end h-[200px] group-hover:scale-[1.05] duration-[300ms]">
                            <div
                                className="bg-[#1B59F8] w-2 rounded-[10px] "
                                style={{ height: `${(week.total / maxTotalExpense) * 100}%` }}
                            />
                        </div>
                        <span className="text-sm nuns-font-500 mt-2 group-hover:scale-[1.1] duration-[300ms]">Week {index + 1}</span>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default ExpenseBarChart;
