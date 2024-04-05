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
import { verifyPassword } from "../helper/helper";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const Formschema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof Formschema>;

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(Formschema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (
    values: z.infer<typeof Formschema>
  ) => {
    const loginData = await verifyPassword(values.email, values.password);

    console.log("loginData", loginData);
    const token = loginData.data;

    localStorage.setItem("token", token);

    if (loginData.success) {
      toast({
        title: "Sucess!!",
        description: <span className="text-green-400">Login successfully</span>,
      });
      navigate("/home", { state: { loginpage: true, email: values.email } });
    }
  };

  return (
    <Card className="shadow-xl shadow-slate-100 border-slate-300 ">
      <CardHeader>
        <CardTitle className="max-lg:text-3xl text-4xl font-extrabold leading-[50%] tracking-tighter text-[#3A244A]">
          Fill what we know <span className="text-[#D72638]">!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center px-8 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-start  gap-6"
        >
          <Input
            {...register("email")}
            placeholder="Email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

          <PasswordInput
            {...register("password")}
            placeholder="Password"
            disabled={isSubmitting}
            // value={passwordConfirmation}
            // onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <Button
            className="w-full rounded-xl mt-5 bg-[#3A244A]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loading /> : "Sign In"}
          </Button>
          <Button
            className="w-full rounded-xl border-2 border-[#3A244A]"
            variant={"outline"}
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              navigate("/profile");
            }}
          >
            {" "}
            <span className="font-semibold text-[#3A244A]">
              {isSubmitting ? <Loading /> : "Sign up"}
            </span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
