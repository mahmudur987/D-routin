import { Navbar } from "flowbite-react";
import { NavbarBrand } from "flowbite-react/lib/esm/components/Navbar/NavbarBrand";
import { NavbarCollapse } from "flowbite-react/lib/esm/components/Navbar/NavbarCollapse";
import { NavbarLink } from "flowbite-react/lib/esm/components/Navbar/NavbarLink";
import { NavbarToggle } from "flowbite-react/lib/esm/components/Navbar/NavbarToggle";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Switcher from "../DarkSide/Switcher";
import { getAuth, signOut } from "firebase/auth";
import app from "../../Firebase/Firebase.config";
import { userContext } from "../../App";

const auth = getAuth(app);

const MyNavbar = () => {
  const { user } = useContext(userContext);
  // console.log(user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="dark:text-white dark:bg-slate-600">
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
          <Link to={"/counter"} active={true}>
            COUNTER
          </Link>

          {user ? (
            <Link>
              <button onClick={handleSignOut} to={"/signup"} active={true}>
                SIGNOUT
              </button>
            </Link>
          ) : (
            <>
              <Link to={"/login"} active={true}>
                LOGIN
              </Link>
              <Link to={"/signup"} active={true}>
                SIGNUP
              </Link>
            </>
          )}

          <Link active={true}>
            <Switcher></Switcher>
          </Link>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
