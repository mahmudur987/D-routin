import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import LoadingSpinar from "../../Components/common/LoadingSpinar/LoadingSpinar";

const AddTask = () => {
  const { user } = useContext(userContext);
  const [image, SetImage] = useState(null);
  const [task, SetTask] = useState("");
  const [loading, setloading] = useState(false);
  const [priority, setPriority] = useState("low");
  const navigate = useNavigate();
  // console.log(user);
  const handleSubmit = (e) => {
    if (!user) {
      toast.error("please logIn first");
      return navigate("/login");
    }
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("image", image);
    const name = e.target.name.value;
    const email = user?.email;
    const completed = false;

    if (image) {
      setloading(true);
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
            const data = { photoURL, task, name, email, completed, priority };
            fetch(
              "https://my-tasks-server-gzb2n5npn-mahmudur987.vercel.app/tasks",
              {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
                if (data.acknowledged) {
                  e.target.reset();
                  toast.success("your task is added successfully");
                  setloading(false);
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        });
    } else {
      const data = { task, name, email, completed, priority, photoURL: "N/A" };
      setloading(true);
      fetch("https://my-tasks-server-gzb2n5npn-mahmudur987.vercel.app/tasks", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.acknowledged) {
            e.target.reset();
            toast.success("your task is added", { id: 1 });
            setloading(false);
          } else if (data.status === "failed") {
            toast.error(data?.message, { id: 2 });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error Happen", { id: 5 });
        });
    }
  };

  if (loading) {
    return <LoadingSpinar />;
  }

  return (
    <div className="mt-20   border p-3 rounded-lg w-full max-w-md mx-auto  dark:bg-slate-900 dark:text-white lg:w-1/2">
      <h1 className="text-3xl text-center font-bold">Add New Task</h1>
      {!user && (
        <p>
          please{" "}
          <Link className="text-blue-500 underline" to={"/login"}>
            Login
          </Link>{" "}
          First
        </p>
      )}
      <div className="mt-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* name */}
          <div>
            <div className="mb-2 block text-start font-bold">
              <Label htmlFor="large" value=" Your Name" />
            </div>
            <input
              required
              defaultValue={user?.displayName}
              placeholder="please Login "
              name="name"
              id="large"
              type="text"
              className="w-full uppercase  border border-gray-300"
            />
          </div>

          {/* photo */}
          <div>
            <div className="mb-2 block text-start">
              <Label
                htmlFor="base"
                value="Add a photo for your task  (optional)"
              />
            </div>
            <TextInput
              onChange={(e) => SetImage(e.target.files[0])}
              id="base"
              type="file"
              sizing="md"
            />
          </div>

          {/* priority */}

          <div className="flex flex-col  items-start">
            <div className="mb-2 block text-start">
              <Label htmlFor="large" value=" Select Priority" />
            </div>
            <select
              onChange={(e) => setPriority(e.target.value)}
              className="select select-ghost w-full  border border-gray-400"
            >
              <option value={"low"}>Low</option>
              <option value={"medium"}>Medium</option>
              <option value={"high"}>High</option>
            </select>
          </div>

          {/* description */}
          <div>
            <div className="mb-2 block text-start">
              <Label htmlFor="large" value="Add Task" />
            </div>
            <textarea
              required
              rows={5}
              onChange={(e) => SetTask(e.target.value)}
              id="large"
              type="text"
              className="w-full"
              placeholder="Write your task discription...."
            />
          </div>
          <div className="flex justify-end">
            <Button className="" color="success" type="submit">
              {" "}
              submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
