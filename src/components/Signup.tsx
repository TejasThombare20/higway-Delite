import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { PasswordInput } from "./ui/PasswordInput";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Loading from "./Loading";
import { checkEmailExists, generateOTP, registerUser } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import { toast } from "./ui/use-toast";

const Formschema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(6),
    repeatpassword: z.string().min(6),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.repeatpassword, {
    message: "Passwords do not match",
    path: ["repeatpassword"],
  });

type FormFields = z.infer<typeof Formschema>;

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      repeatpassword: "",
      email: "",
    },
    resolver: zodResolver(Formschema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (
    values: z.infer<typeof Formschema>
  ) => {
    console.log("isSubmit", isSubmitting);
    const bodyData = {
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      email: values.email,
    };
    // console.log("bodyData", bodyData);

    const emailExists = await checkEmailExists(values.email);
    console.log("emailExists", emailExists);
    if (emailExists) {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
      return;
    }

    let otpData;
    try {
      otpData = await generateOTP(values.email);

      console.log(" otp data", otpData);
      toast({
        value: "",
        description: (
          <span className="text-black">OTP has sent on your email</span>
        ),
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Oops! Something went wrong",
        variant: "destructive",
        description: (
          <pre className="mt-1 w-[340px] rounded-md bg-slate-950 p-2">
            <code className="text-white">
              There is an error to generate the OTP
            </code>
          </pre>
        ),
      });
      return;
    }

    navigate("/otp-verificaton", {
      state: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        code: otpData,
      },
    });
  };

  return (
    <Card className="shadow-xl shadow-slate-100 border-slate-300 ">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="max-lg:text-3xl text-4xl font-extrabold leading-[50%] tracking-tighter text-[#3A244A]">
            Let us know <span className="text-[#D72638]">!</span>
          </div>
          <div className="underline text-[15px]">
            Sign{" "}
            <span className="underline  text-[#D72638] decoration-[#D72638]">
              in
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center px-8 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-start  gap-6"
        >
          <Input
            {...register("firstName")}
            placeholder="First Name"
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <div className="text-red-500">{errors?.firstName?.message}</div>
          )}

          <Input
            {...register("lastName")}
            placeholder="Last Name"
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <div className="text-red-500">{errors?.lastName?.message}</div>
          )}

          <PasswordInput
            {...register("password")}
            placeholder="set password"
            disabled={isSubmitting}
            // value={passwordConfirmation}
            // onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <PasswordInput
            {...register("repeatpassword")}
            placeholder="Retype password"
            disabled={isSubmitting}
            // value={passwordConfirmation}
            // onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {errors.repeatpassword && (
            <div className="text-red-500">{errors.repeatpassword.message}</div>
          )}
          <Input
            {...register("email")}
            placeholder="Enter Email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

          <Button
            className="w-full rounded-xl border-2 bg-[#3A244A] text-white hover:text-[#3A244A] "
            variant={"outline"}
            type="submit"
            disabled={isSubmitting}
          >
            {" "}
            <span className="font-semibold ">
              {isSubmitting ? <Loading /> : "Sign up"}
            </span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
