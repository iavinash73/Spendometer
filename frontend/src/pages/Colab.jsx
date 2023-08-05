import React, { useEffect, useState } from "react";
import { getColabs, reset } from "../features/colabs/colabSlice";
import ColabForm from "../components/colabs/ColabAdd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import DisplayColabs from "../components/colabs/DisplayColabs"
function Colab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { colabs, isLoading, isError, message, total } = useSelector(
    (state) => state.colabs
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(getColabs());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
    <div className="absolute top-4 right-4"><img src={user.image} className="w-14 h-14 rounded-full object-cover hover:scale-[1.1] duration-[300ms]"></img></div>

    <DisplayColabs colabs={colabs}/>
      <div className="fixed bottom-20 md:bottom-6 right-6 flex items-end justify-end">
        <button
          onClick={openDialog}
          className="duration-[300ms] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] shadow-lg w-12 h-12 text-2xl bg-white rounded-full"
        >
          +
        </button>
        {isDialogOpen && <ColabForm onClose={closeDialog} />}
      </div>
    </div>
  )
}

export default Colab
