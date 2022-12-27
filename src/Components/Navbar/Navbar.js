import { Navbar } from "flowbite-react";
import { NavbarBrand } from "flowbite-react/lib/esm/components/Navbar/NavbarBrand";
import { NavbarCollapse } from "flowbite-react/lib/esm/components/Navbar/NavbarCollapse";
import { NavbarLink } from "flowbite-react/lib/esm/components/Navbar/NavbarLink";
import { NavbarToggle } from "flowbite-react/lib/esm/components/Navbar/NavbarToggle";
import React from "react";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <div>
      <Navbar fluid={true} rounded={true}>
        <NavbarBrand>
          <img
            src="https://www.pngkit.com/png/detail/770-7704437_daily-routine-clipart-businessman-daily-routine-concept-imagens.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            D-Routin
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <Link to={"/"} active={true}>
            ADD TASK
          </Link>
          <Link to={"/mytask"} active={true}>
            MY TASKS
          </Link>
          <Link to={"/completetask"} active={true}>
            COMPLETED TASKS
          </Link>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
