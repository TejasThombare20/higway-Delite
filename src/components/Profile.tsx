import React from "react";

import Signup from "./Signup";

const Profle = () => {
  return (
    <section className="w-full flex justify-center items-center max-sm:flex-col  ">
      <div className=" max-lg:w-[320px] w-[600px] lg:h-[700px] justify-center items-center rounded-md">
        <img src="/signup.svg" alt="" className="object-contain " />
      </div>

      <Signup />
    </section>
  );
};

export default Profle;
