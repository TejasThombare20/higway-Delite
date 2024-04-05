import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "./ui/use-toast";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto w-full flex-col justify-center space-y-6 max-w-2xl  ">
        <div className="flex flex-col items-center gap-6 text-center">
          {location.state ? (
            location.state.loginpage ? (
              <>
                <Button
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-fit",
                  })}
                  onClick={() => {
                    localStorage.removeItem("token");

                    toast({
                      title: "Success",
                      description: (
                        <span className="text-red-500">
                          Logout successfully
                        </span>
                      ),
                    });
                    navigate("/");
                  }}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Logout
                </Button>

                <h1 className="text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter text-4xl md:text-5xl lg:text-6xl">
                  You are logged in as{" "}
                  <span className="font-serif"> {location.state.email}</span>
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter text-4xl md:text-5xl lg:text-6xl">
                  Welcome {location.state?.firstName} {location.state?.lastName}
                </h1>
                <Button
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-fit flex justify-center items-center",
                  })}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Main page
                </Button>
              </>
            )
          ) : (
            <>
              <section className="flex flex-col justify-center items-center w-full h-screen gap-5">
                <div className="text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter text-4xl md:text-5xl lg:text-6xl">
                  Go back to main page
                </div>
                <Button
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-fit flex justify-center items-center",
                  })}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                </Button>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
