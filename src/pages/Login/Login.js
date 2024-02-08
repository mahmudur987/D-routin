import React, { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase/Firebase.config";
import { Button, Label, TextInput } from "flowbite-react";
import { userContext } from "../../App";
import LoadingSpinar from "../../Components/common/LoadingSpinar/LoadingSpinar";
const auth = getAuth(app);

const LogIn = () => {
  const [error, SetError] = useState("");
  const [loading, Setloading] = useState(false);
  const { Setuser, user } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleSubmit = (event) => {
    Setloading(true);
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        Setuser(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        SetError(errorMessage);
        Setloading(false);
      });
  };
  if (loading) {
    return <LoadingSpinar />;
  }
  console.log(user);
  return (
    <div className="max-w-lg w-full mx-auto  dark:bg-slate-900 dark:text-white flex flex-col gap-10 ">
      <h1 className="text-4xl uppercase font-extrabold m-3 p-3">Log In</h1>
      {!user && (
        <p>
          Test Email: polash@gmail.com
          <br />
          Test Pass: 123456
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div>
          <div className="mb-2 block text-start font-semibold ">
            <p>Your Email</p>
          </div>
          <TextInput name="email" type="email" required={true} />
        </div>
        <div>
          <div className="mb-2 block text-start font-semibold">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput name="password" type="text" required={true} />
        </div>
        <p className="text-red"> {error} </p>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default LogIn;
