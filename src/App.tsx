import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Username from "./components/Username";

import Register from "./components/Profile";
import Profile from "./components/Profile";

import PageNotFound from "./components/PageNotFound";
import OTP from "./components/OTP";
import { Toaster } from "./components/ui/toaster";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username></Username>,
  },
  {
    path: "/otp-verificaton",
    element: <OTP></OTP>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  return (
    <main>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
