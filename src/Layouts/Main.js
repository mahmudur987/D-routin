import React from "react";
import { Link, Outlet } from "react-router-dom";
import MyNavbar from "../Components/Navbar/Navbar";
import Switcher from "../Components/DarkSide/Switcher";

const Main = () => {
  return (
    <div className="container mx-auto relative dark:bg-slate-900 dark:text-white">
      <Link className="fixed z-20 top-1 right-1">
        <Switcher />
      </Link>

      <MyNavbar />
      <Outlet />
    </div>
  );
};

export default Main;
