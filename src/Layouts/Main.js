import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Switcher from "../Components/DarkSide/Switcher";

const Main = () => {
  return (
    <div className=" relative dark:bg-slate-900 dark:text-white">
      <Link className="absolute z-20 top-1 right-1">
        <Switcher />
      </Link>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
