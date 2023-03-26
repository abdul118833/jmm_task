import React from "react";
import { ThreeDots } from "react-loader-spinner";

const ThreeDot = () => {
  return (
    <ThreeDots
      height="26"
      width="26"
      radius="9"
      color="white"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default ThreeDot;
