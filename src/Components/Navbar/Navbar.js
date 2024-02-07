import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../../Firebase/Firebase.config";
import { userContext } from "../../App";

const auth = getAuth(app);
const MyNavbar = () => {
  const { user } = useContext(userContext);

  const handleSignOut = async () => {
    return signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const menuItems = (
    <>
      <li>
        <Link to={"/"}>ADD TO DO</Link>
      </li>

      <li>
        <Link to={"/mytask"}>MY TO DO</Link>
      </li>
      <li>
        <Link to={"/completetask"}>COMPLETED TASKS</Link>
      </li>
      <li>
        <Link to={"/counter"}>COUNTER</Link>
      </li>

      {user ? (
        <li>
          {" "}
          <button onClick={handleSignOut}>SIGNOUT</button>
        </li>
      ) : (
        <>
          <li>
            <Link to={"/signup"}>SIGNUP</Link>
          </li>
          <li>
            <Link to={"/login"}>LOGIN</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="container  navbar pt-5">
      <div className="navbar-start flex gap-3">
        <Link to={"/"} className="btn btn-ghost text-xl">
          D-Routin
        </Link>
        {user && <span>of</span>}
        {user && (
          <span className="uppercase text-pink-300">{user?.displayName}</span>
        )}
      </div>
      <div className="navbar-center w-4/5  hidden lg:flex justify-end">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box left-[-150px]"
          >
            {menuItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;
