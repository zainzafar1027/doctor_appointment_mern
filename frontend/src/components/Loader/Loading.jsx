import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <HashLoader color="#0067FF" />
    </div>
  );
};

export default Loading;
