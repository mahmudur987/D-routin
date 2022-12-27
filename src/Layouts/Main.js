import React from "react";
import { Outlet } from "react-router-dom";
import MyNavbar from "../Components/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <MyNavbar></MyNavbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
