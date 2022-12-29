import React from "react";
import { Outlet } from "react-router-dom";
import MyNavbar from "../Components/Navbar/Navbar";

const Main = () => {
  return (
    <div className="lg:w-9/12 md:w-11/12 mx-auto">
      <MyNavbar></MyNavbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
