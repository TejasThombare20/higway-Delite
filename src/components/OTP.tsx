"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "./ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser, verifyOTP } from "../helper/helper";
import { useEffect } from "react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const verfiyStatus = await verifyOTP(data.pin);

    console.log("verfiyStatus", verfiyStatus.data.data);

    if (!verfiyStatus.data.data) {
      toast({
        value: "Invalid otp",
        description: <span className="text-white">Enter a valid otp</span>,
        variant: "destructive",
      });

      return;
    }

    const bodyData = {
      email: location.state?.email || "",
      firstName: location.state?.firstName || "",
      lastName: location.state?.lastName || "",
      password: location.state?.password,
    };

    const userData = await registerUser(bodyData);

    console.log("userData", userData?.data);

    if (userData?.data.success) {
      toast({
        title: "Success!",
        description: (
          <span className="text-green-400">
            {" "}
            Your account created successfully
          </span>
        ),
      });
      navigate("/home", {
        state: {
          firstName: location.state?.firstName,
          lastName: location.state?.lastName,
        },
      });
    } else {
      toast({
        title: "Oops! somthing went wrong!",
        description: (
          <span className="text-white">Unable to create account</span>
        ),
        variant: "destructive",
      });
    }
  }

  return (
    <section className="w-full h-screen flex justify-center items-center ">
      <div className=" w-[400px] px-4 py-10 border-slate-100 rounded-xl bg-slate-50 shadow-xl shadow-slate-200 flex flex-col justify-center items-start gap-4 ">
        <div className="text-3xl font-bold font-serif">OTP Verification</div>
        <p className="text-pretty font-serif">
          OTP has been sent on your email{" "}
          <span className="font-semibold">{location.state?.email}</span>.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-start justify-center space-y-6 font-serif"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default OTP;
