import { useQuery } from "@tanstack/react-query";

import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import Task from "../../Components/MyTask/Task";

import LoadingSpinar from "../../Components/common/LoadingSpinar/LoadingSpinar";
import { Link } from "react-router-dom";
const MyTasks = () => {
  const { user } = useContext(userContext);
  const [filterPriority, setFilterPriority] = useState("All");
  const {
    isLoading,
    error,
    data: allTasks,
    refetch,
  } = useQuery({
    queryKey: ["tasks", `${user?.email}`],
    queryFn: () =>
      fetch(
        `https://my-tasks-server-gzb2n5npn-mahmudur987.vercel.app/tasks?email=${user?.email}`
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return <LoadingSpinar />;
  }

  if (error) {
    return <div>An error has occurred: {error.message};</div>;
  }
  const tasks =
    filterPriority === "All"
      ? allTasks
      : allTasks.filter((task) => task.priority === filterPriority);
  const handleSelectChange = (event) => {
    const priority = event.target.value;
    setFilterPriority(priority);
  };
  return (
    <div className="container mx-auto   dark:bg-slate-900 dark:text-white">
      <div className="mt-10  flex justify-center flex-col items-center gap-10">
        <h1 className="text-3xl font-bold uppercase">
          {" "}
          To do list( {tasks.length})
        </h1>
        <div className="flex justify-end w-full">
          <select
            className="rounded-xl"
            value={filterPriority}
            onChange={handleSelectChange}
          >
            <option value="All">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="w-full">
          {tasks.length > 0 ? (
            <>
              <div className="w-full flex justify-around flex-wrap ">
                {tasks?.map((task, idx) => (
                  <Task refetch={refetch} key={idx} idx={idx} task={task} />
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-2xl my-20  uppercase text-red-500">
                No data to show
              </p>
              <Link className="text-blue-500 font-bold" to={"/"}>
                Add a task
              </Link>
              <p className="text-2xl my-20   text-red-500">
                Dont Have any account {"  "}
                <Link className="text-blue-500 font-bold" to={"/signup"}>
                  Signup
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
