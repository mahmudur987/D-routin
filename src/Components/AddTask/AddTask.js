import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../App";

const AddTask = () => {
  const { user } = useContext(userContext);
  const [image, SetImage] = useState("");
  const [task, SetTask] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  // console.log(user);
  const handleSubmit = (e) => {
    if (!user) {
      toast.error("please logIn first");
      return navigate("/signup");
    }
    e.preventDefault();
    setloading(true);
    const imageData = new FormData();
    imageData.append("image", image);
    const name = e.target.name.value;
    const email = user?.email;
    const completed = false;
    const url =
      "https://api.imgbb.com/1/upload?key=02b8716b08c03a0ba7282f83767ec3fe";
    fetch(url, {
      method: "POST",
      body: imageData,
    })
      .then((res) => res.json())
      .then((imagedata) => {
        console.log(imagedata);
        if (imagedata.success) {
          const photoURL = imagedata.data.display_url;
          const myTask = { photoURL, task, name, email, completed };
          fetch("https://my-tasks-server.vercel.app/tasks", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(myTask),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              if (data.acknowledged) {
                e.target.reset();
                toast.success("your task is added");
                setloading(false);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
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
    <div className="mt-20 w-full border-black border p-3 rounded-lg  md:w-11/12 mx-auto lg:w-1/2">
      <h1 className="text-3xl text-center font-bold">Add New Task</h1>

      <div className="mt-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="base" value="Add Photo" />
            </div>
            <TextInput
              required
              onChange={(e) => SetImage(e.target.files[0])}
              id="base"
              type="file"
              sizing="md"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="large" value="Add Your Name" />
            </div>
            <input
              required
              // onChange={(e) => SetTask(e.target.value)}
              defaultValue={user?.displayName}
              name="name"
              id="large"
              type="text"
              className="w-full text-2xl "
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="large" value="Add Task" />
            </div>
            <input
              required
              onChange={(e) => SetTask(e.target.value)}
              id="large"
              type="text"
              className="w-full h-36  text-2xl "
            />
          </div>

          <Button color="success" type="submit">
            {" "}
            submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
