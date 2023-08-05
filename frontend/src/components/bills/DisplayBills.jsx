import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import UpdateItem from './UpdateItem';
import { deleteBill, updateBill } from '../../features/bills/billSlice';

function DisplayBills({ bills }) {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [st, setst] = useState('');

  const openDialog = (val) => {
    setIsDialogOpen(true);
    setst(val);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const calculateRenewalDate = (startingDate, duration) => {
    const startDate = new Date(startingDate);
    const renewalDate = new Date(startDate.setMonth(startDate.getMonth() + duration));
    return renewalDate.toDateString(); // Adjust the date formatting as per your needs
  };

  const handleStatusToggle = (bill, isActive) => {
    dispatch(
      updateBill({
        id: bill._id,
        title: bill.title,
        cost: bill.cost,
        duration: bill.duration,
        date: bill.startingDate,
        status: isActive,
      })
    );
  };

  return (<>


    <div className="p-1.5 mx-[3%] overflow-auto md:max-w-min rounded-xl nuns-font-600">
      <div className="max-h-[500px] md:max-h-[550px] w-screen md:max-w-min overflow-auto">
        <table className="divide-y divide-gray-400 ">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Total Cost
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Renewal Date
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase"></th>
              <th scope="col" className="px-6 py-3 text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="">
            {bills.map((specbill) => (
              <tr
                className={` rounded-lg duration-[300ms]`}
              >
                <td
                  className={`px-6 py-4 text-gray-800 whitespace-nowrap ${specbill.status === true ? '' : ' line-through decoration-gray-600'
                    }`}
                >
                  {specbill.title}
                </td>
                <td
                  className={`px-6 py-4 text-gray-800 whitespace-nowrap ${specbill.status === true ? '' : ' line-through decoration-gray-600'
                    }`}
                >
                  {specbill.cost}
                </td>
                <td
                  className={`px-6 py-4 text-gray-800 whitespace-nowrap ${specbill.status === true ? '' : ' line-through decoration-gray-600'
                    }`}
                >
                  {specbill.duration}
                </td>
                <td
                  className={`px-6 py-4 text-green-500 hover:text-green-700 whitespace-nowrap ${specbill.status === true ? '' : ' line-through decoration-gray-600'
                    }`}
                >
                  {specbill.startingDate}
                </td>
                <td
                  className={`px-6 py-4 text-green-500 hover:text-green-700 whitespace-nowrap ${specbill.status === true ? '' : ' line-through decoration-gray-600'
                    }`}
                >
                  {calculateRenewalDate(specbill.startingDate, specbill.duration)}
                </td>
                <td className="px-6 py-4  whitespace-nowrap">
                  {specbill.status === true ? 'Active' : 'Inactive'}
                </td>
                <td className="px-6 py-4  whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={specbill.status === true}
                    onChange={() => handleStatusToggle(specbill, !specbill.status)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <a
                      className="text-green-500 hover:text-red-700 duration-[300ms]"
                      href="#"
                      onClick={() => openDialog(specbill._id)}
                    >
                      Edit
                    </a>

                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    onClick={() => dispatch(deleteBill({ id: specbill._id, cost: specbill.cost }))}
                    className="text-red-500 hover:text-red-700 duration-[300ms]"
                    href="#"
                  >
                    Delete
                  </a>
                </td>
                {isDialogOpen && st === specbill._id && (
                  <UpdateItem key={specbill._id} bill={specbill} onClose={closeDialog} />
                )}
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
}

export default DisplayBills;
