import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase/Firebase.config";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
const auth = getAuth(app);

const LogIn = () => {
  const [error, SetError] = useState("");
  const [loading, Setloading] = useState(false);

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
        navigate(from, { replace: true });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        SetError(errorMessage);
        Setloading(false);
      });
  };
  if (loading) {
    return (
      <div className="flex items-center w-full h-96 justify-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="md:w-9/12 lg:2/3 mx-auto">
      <h1 className="text-4xl underline font-extrabold m-3 p-3">Log In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <p>Your Email</p>
          </div>
          <TextInput name="email" type="email" required={true} />
        </div>
        <div>
          <div className="mb-2 block">
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
