import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useContext } from "react";
import { userContext } from "../../App";
import Task from "../MyTask/Task";

const CompleteTasks = () => {
  const { user } = useContext(userContext);
  const {
    isLoading,
    error,
    data: tasks,
    refetch,
  } = useQuery({
    queryKey: ["completetasks", `${user.email}`],
    queryFn: () =>
      fetch(
        `https://my-tasks-server.vercel.app/completetasks?email=${user.email}`
      ).then((res) => res.json()),
  });

  // console.log(tasks);

  if (isLoading) {
    return (
      <div className="flex items-center w-full h-96 justify-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  if (error) {
    return <div>An error has occurred: {error.message};</div>;
  }

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold">CompleteTasks</h1>

      <div className=" grid gap-5">
        {tasks.map((task, idx) => (
          <Task refetch={refetch} key={idx} idx={idx} task={task}></Task>
        ))}
      </div>
    </div>
  );
};

export default CompleteTasks;
