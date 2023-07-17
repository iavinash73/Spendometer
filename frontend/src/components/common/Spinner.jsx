import React from "react";
import spinnerGif from "../../images/rickroll.gif"; // Replace "spinner.gif" with the actual path to your spinner GIF


function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="nm-flat-slate-200-xl rounded-full">
        <div
          className="animate-spin-slow rounded-full h-16 w-16 md:h-32 md:w-32 border-t-2 border-black"
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