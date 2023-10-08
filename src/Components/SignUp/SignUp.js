import React, { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "../../Firebase/Firebase.config";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { userContext } from "../../App";
const auth = getAuth(app);

const SignUp = () => {
  const [loading, Setloading] = useState(false);
  const { Setuser } = useContext(userContext);
  const [error, SetError] = useState("");
  const [photo, setphoto] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleSubmit = (event) => {
    Setloading(true);
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const imageData = new FormData();
    imageData.append("image", photo);

    const url =
      "https://api.imgbb.com/1/upload?key=02b8716b08c03a0ba7282f83767ec3fe";
    fetch(url, {
      method: "POST",
      body: imageData,
    })
      .then((res) => res.json())
      .then((imagedata) => {
        console.log(imagedata);
        const photoURL = imagedata.data.display_url;
        if (imagedata.success) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
              const user = result.user;
              Setuser(user);
              // console.log(user);
              handleUpdateProfile(name, photoURL);
              navigate(from, { replace: true });
            })
            .catch((error) => {
              const errorMessage = error.message;
              SetError(errorMessage);
            });
        }
      });
  };

  const handleUpdateProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };

    updateProfile(auth.currentUser, profile)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        SetError(error.message);
      });
    Setloading(false);
  };
  if (loading) {
    return (
      <div className="flex items-center w-full h-96 justify-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="md:w-9/12 lg:2/3 mx-auto dark:bg-slate-900 dark:text-white">
      <h1 className="text-4xl underline font-extrabold m-3 p-3">SIGN UP</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <p>Your Name</p>
          </div>
          <TextInput
            name="name"
            type="text"
            placeholder="Your Name"
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <p>Choose Photo</p>
          </div>
          <TextInput
            onChange={(e) => setphoto(e.target.files[0])}
            type="file"
            required={true}
          />
        </div>
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

export default SignUp;
