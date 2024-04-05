import React from "react";
import SignIn from "./SignInForm";

const Username = () => {
  return (
    <section className="w-full flex justify-center items-center max-sm:flex-col  ">
      <div className=" max-lg:w-[320px] w-[600px] h-full justify-center items-center rounded-md">
        <img src="/signin.svg" alt="" className="object-contain " />
      </div>

      <SignIn />
    </section>
  );
};

export default Username;
