import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    defs,
} from 'recharts';

const BarChartComponent = ({ expenses }) => {
    const groupedExpenses = expenses.reduce((result, expense) => {
        const expenseDate = new Date(expense.date);
        const weekNumber = Math.ceil(expenseDate.getDate() / 7);
        const weekKey = `Week ${weekNumber}`;

        if (!result[weekKey]) {
            result[weekKey] = 0;
        }

        result[weekKey] += expense.cost;

        return result;
    }, {});

    const data = Object.entries(groupedExpenses).map(([week, Weeks]) => ({
        name: week,
        Weeks,
    }));

    return (
        <div className="nm-inset-slate-200 nuns-font-600 py-6 px-4 my-6 rounded-[10px]">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(217, 70, 239)" />
                            <stop offset="50%" stopColor="rgb(220, 38, 38)" />
                            <stop offset="100%" stopColor="rgb(251, 146, 60)" />
                            {/* linear-gradient(rgb(190, 18, 60), rgb(219, 39, 119)) */}
                            {/* linear-gradient(to right, rgb(217, 70, 239), rgb(220, 38, 38), rgb(251, 146, 60)) */}
                        </linearGradient>
                    </defs>
                    <Bar
                        dataKey="Weeks"
                        shape={<CustomBar />}
                        barSize={50}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        // Customize tooltip styles here
        const tooltipStyle = {
            backgroundColor: '', // Replace with your desired tooltip background color
            color: '#000', // Replace with your desired tooltip text color
           
        };

        return (
            <div className="custom-tooltip" style={tooltipStyle}>
                <p>{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};


const CustomBar = ({ x, y, width, height }) => (
    <g>
        <rect
            x={x + 2}
            y={y + 2}
            width={width - 4}
            height={height - 4}
            className="neu-bar"
            ry="4"
            // ry=""
            fill="url(#gradient)"
        />
    </g>
);

export default BarChartComponent;
