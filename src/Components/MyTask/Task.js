import { Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import UpdateModal from "./UpdateModal";
import placeholder from "../../assets/placeholder.jpg";
const Task = ({ idx, task, refetch }) => {
  const [complete, Setcomplete] = useState(task.completed);
  const [showModal, setShowModal] = React.useState(false);
  const [newTask, setNewTask] = useState(task.task);
  const handleNewTaskSubmit = () => {
    const updatedTask = { newTask };
    fetch(
      `https://my-tasks-server-gzb2n5npn-mahmudur987.vercel.app/tasks/${task._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        task.task = newTask;
        setShowModal(false);
        toast.success("update successfully");
      });
  };

  const handleNewTaskComplete = () => {
    fetch(
      `https://my-tasks-server-gzb2n5npn-mahmudur987.vercel.app/mytasks/${task?._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("your task is completed");
          Setcomplete(true);
          refetch();
        }
      });
  };
  const handleNewTaskNotComplete = () => {
    fetch(
      `https://my-tasks-server-gzb2n5npn-mahmudur987.vercel.app/mytask/${task._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("your task is added to my task again");
          refetch();
        }
      });
  };

  const handleTaskDelete = (id) => {
    let url = `https://my-tasks-server-gzb2n5npn-mahmudur987.vercel.app/task/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success("your has been deleted successfully");
          refetch();
        }
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  return (
    <div className=" max-w-md w-full border border-black shadow-xl m-3 rounded-xl  dark:bg-slate-900 dark:text-white">
      <UpdateModal
        handleNewTaskSubmit={handleNewTaskSubmit}
        idx={idx}
        task={task}
        showModal={showModal}
        setShowModal={setShowModal}
        setNewTask={setNewTask}
      />

      <div className=" dark:bg-slate-900 dark:text-white p-5 w-full h-full  flex flex-col justify-between ">
        <h5 className="text-2xl text-start flex justify-between font-bold tracking-tight text-gray-900 dark:text-white">
          <span className="bg-blue-800 text-white p-3 rounded-full">
            {idx + 1}
          </span>

          <span
            className={`${task.priority === "low" && "bg-green-500"} ${
              task.priority === "medium" && "bg-yellow-500"
            } ${
              task.priority === "high" && "bg-red-500"
            } text-white p-2 h-12 uppercase text-lg rounded-2xl`}
          >
            {task.priority}
          </span>
        </h5>
        <p className="w-full">
          <img
            className=" h-32 mx-auto"
            src={task.photoURL === "N/A" ? placeholder : task.photoURL}
            alt=""
          />
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {task.task}
        </p>
        <div className="mt-5 flex justify-around ">
          <Button onClick={() => handleTaskDelete(task._id)} className="">
            DELETE
          </Button>
          <Button
            disabled={complete ? true : false}
            onClick={() => setShowModal(true)}
            className={complete ? "hidden" : " p-1"}
          >
            UPDATE
          </Button>
          <Button
            onClick={handleNewTaskComplete}
            className={complete ? "hidden" : " p-1"}
          >
            COMPLETE
          </Button>
          <Button
            onClick={handleNewTaskNotComplete}
            className={complete ? " p-1 text-sm" : "hidden"}
          >
            NOT COMPLETED
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Task;
