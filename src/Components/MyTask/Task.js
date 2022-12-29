import { Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import UpdateModal from "./UpdateModal";

const Task = ({ idx, task, refetch }) => {
  const [complete, Setcomplete] = useState(task.completed);
  const [showModal, setShowModal] = React.useState(false);
  const [newTask, setNewTask] = useState(task.task);
  console.log(task);
  const handleNewTaskSubmit = () => {
    const updatedTask = { newTask };
    fetch(`https://my-tasks-server.vercel.app/tasks/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        task.task = newTask;
        setShowModal(false);
      });
  };
  const handleNewTaskComplete = () => {
    fetch(`https://my-tasks-server.vercel.app/mytasks/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    fetch(`http://localhost:5000/mytask/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    let url = `https://my-tasks-server.vercel.app/task/${id}`;
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
    <div className="border border-black shadow-xl m-3 rounded-xl">
      <UpdateModal
        handleNewTaskSubmit={handleNewTaskSubmit}
        idx={idx}
        task={task}
        showModal={showModal}
        setShowModal={setShowModal}
        setNewTask={setNewTask}
      ></UpdateModal>

      <Card className="">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          My task {idx + 1}
        </h5>
        <p className="">
          <img className=" h-32 mx-auto" src={task.photoURL} alt="" />
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {task.task}
        </p>
        <div className="flex justify-around ">
          <Button onClick={() => handleTaskDelete(task._id)} className="">
            DELETE
          </Button>
          <Button
            disabled={complete ? true : false}
            onClick={() => setShowModal(true)}
            className=""
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
            className={complete ? " p-1" : "hidden"}
          >
            NOT COMPLETED
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Task;
