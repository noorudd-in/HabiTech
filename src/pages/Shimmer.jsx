import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Shimmer = () => {
  return (
    <div className="flex justify-center">
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
};

export default Shimmer;
