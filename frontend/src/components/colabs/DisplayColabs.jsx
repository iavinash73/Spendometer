import bin from "../../images/bin.png";
import edit from "../../images/edit.png";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ColabUpdate from "./ColabUpdate";
import { deleteColab } from "../../features/colabs/colabSlice";
import ColabDetails from "./ColabDetails";

function DisplayColabs({ colabs }) {
    const dispatch = useDispatch();
    const [selectedColab, setSelectedColab] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = (val) => {
        setIsDialogOpen(true);
        setSelectedColab(val);
    };

    const setSelected = (val) => {
        setSelectedColab(val);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            {/* <div>
                Check out your colabs with your friends
            </div> */}
            <div className="flex items-center min-h-screen">
                <div className="w-[60%] pl-[1%] rounded-[10px]">

                    {colabs.map((spec) => (<>
                        <div
                            key={spec._id}
                            onMouseEnter={() => setSelected(spec)}
                            className="flex flex-col  my-[40px] rounded-[10px] mx-[4%] nuns-font-600  group hover:scale-[1.02] duration-[300ms]"
                        >
                            <div className="flex flex-row items-center">
                                <div className="w-[30%] flex -space-x-14">
                                    {spec.users.map((user) => (
                                        <>
                                            <img className="w-[85px] h-[85px] border-2 border-white rounded-full dark:border-gray-800 object-cover" src={user.image} alt="" />

                                        </>
                                    ))}
                                </div>
                                <div className="w-[70%] text-[28px] nuns-font-700 my-[3px] duration-[300ms]">
                                    <div className="">{spec.title}</div>
                                    <div className="text-[16px] nuns-font-600 my-[3px]">
                                        {spec.desc}
                                    </div>
                                </div>

                            </div>
                            <div className="mt-[5px] ml-[30%]">
                                <img
                                    src={edit}
                                    className="inline w-[22px] translate-y-[-35%] opacity-0 transform transition duration-[300ms] group-hover:translate-y-0 group-hover:opacity-100 hover:scale-[1.2] hover:cursor-pointer"
                                    onClick={() => openDialog(spec)}
                                    alt=""
                                ></img>
                                <img
                                    src={bin}
                                    className="inline w-[22px] ml-[13px] translate-y-[-35%] opacity-0 transform transition duration-[300ms] group-hover:translate-y-0 group-hover:opacity-100 hover:scale-[1.2] hover:cursor-pointer"
                                    onClick={() => dispatch(deleteColab(spec._id))}
                                    alt=""
                                ></img>
                            </div>
                        </div>

                    </>
                    ))}
                </div>
                {selectedColab && (

                    <ColabDetails colab={selectedColab} />
                )}
            </div>
            {isDialogOpen && (
                <ColabUpdate key={selectedColab._id} colab={selectedColab} onClose={closeDialog} />
            )}
        </>
    );
}

export default DisplayColabs;
