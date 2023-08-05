import React from "react";
import spinnerGif from "../../images/rickroll.gif"; // Replace "spinner.gif" with the actual path to your spinner GIF


function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" rounded-full">
        <div
          className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] animate-spin-slow rounded-full h-16 w-16 md:h-32 md:w-32 bg-gray-200 "
          style={{
            backgroundImage: `url(${spinnerGif})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Spinner;