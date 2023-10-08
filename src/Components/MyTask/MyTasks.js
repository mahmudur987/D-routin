import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useContext } from "react";
import { userContext } from "../../App";
import Task from "./Task";

const MyTasks = () => {
  const { user } = useContext(userContext);
  const {
    isLoading,
    error,
    data: tasks,
    refetch,
  } = useQuery({
    queryKey: ["tasks", `${user?.email}`],
    queryFn: () =>
      fetch(
        `https://my-tasks-server.vercel.app/tasks?email=${user?.email}`
      ).then((res) => res.json()),
  });

  console.log(tasks);

  if (isLoading) {
    return (
      <div className="flex items-center w-full h-96 justify-center   dark:bg-slate-900 dark:text-white">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  if (error) {
    return <div>An error has occurred: {error.message};</div>;
  }

  return (
    <div className="container mx-auto   dark:bg-slate-900 dark:text-white">
      <div className="mt-10  flex justify-center flex-col items-center gap-10">
        <h1 className="text-3xl font-bold">MY TASKS</h1>

        <div className="w-full">
          {tasks.length > 0 ? (
            <>
              <div className="w-full flex justify-around flex-wrap gap-5">
                {tasks?.map((task, idx) => (
                  <Task
                    refetch={refetch}
                    key={idx}
                    idx={idx}
                    task={task}
                  ></Task>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-2xl my-20  uppercase text-red-500">
                you have no task
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
