import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import UpdateItem from "./UpdateItem";
import { deleteExpense } from "../../features/expenses/expenseSlice";

function DisplayExpenses({ expenses }) {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [st, setst] = useState("");
  const openDialog = (val) => {
    setIsDialogOpen(true);
    setst(val);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="p-1.5 md:mx-0 mx-[3%]  text-[17px] overflow-auto md:max-w-min rounded-xl nuns-font-600">
      <div className="max-h-[500px] md:max-h-[550px] w-screen md:max-w-min overflow-auto">
        <table className="divide-y divide-gray-400 ">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Desc
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Cost
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Tag
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Mode
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase"></th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="">
            {expenses.map((specexpense) => (
              <tr className="duration-[300ms]" key={specexpense._id}>
                <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                  {specexpense.desc}
                </td>
                <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                  {specexpense.cost}
                </td>
                <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                  {specexpense.tag}
                </td>
                <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                  {specexpense.mode}
                </td>
                <td className="px-6 py-4  whitespace-nowrap">
                  {specexpense.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="hover:scale-[1.07] duration-[300ms]">
                    <a
                      className="text-green-500 hover:text-green-700 duration-[300ms]"
                      href="#"
                      onClick={() => openDialog(specexpense._id)}
                    >
                      Edit
                    </a>
                  </div>
                </td>
                {isDialogOpen && st === specexpense._id && (
                  <UpdateItem
                    key={specexpense._id}
                    expense={specexpense}
                    onClose={closeDialog}
                  />
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="hover:scale-[1.05] duration-[300ms]">

                    <a
                      onClick={() =>
                        dispatch(
                          deleteExpense({
                            id: specexpense._id,
                            cost: specexpense.cost,
                          })
                        )
                      }
                      className="text-red-500 hover:text-red-700 hover:scale-[1.07] duration-[300ms]"
                      href="#"
                    >
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayExpenses;
