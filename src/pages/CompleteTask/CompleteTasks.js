import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { userContext } from "../../App";
import Task from "../../Components/MyTask/Task";
import LoadingSpinar from "../../Components/common/LoadingSpinar/LoadingSpinar";

const CompleteTasks = () => {
  const { user } = useContext(userContext);
  const {
    isLoading,
    error,
    data: tasks,
    refetch,
  } = useQuery({
    queryKey: ["completetasks", `${user?.email}`],
    queryFn: () =>
      fetch(
        `https://my-tasks-server-gzb2n5npn-mahmudur987.vercel.app/completetasks?email=${user?.email}`
      ).then((res) => res.json()),
  });

  console.log(tasks);

  if (isLoading) {
    return <LoadingSpinar />;
  }

  if (error) {
    return <div>An error has occurred: {error.message};</div>;
  }

  return (
    <div className="container mx-auto   dark:bg-slate-900 dark:text-white">
      <div className="mt-10  flex justify-center flex-col items-center gap-10">
        <h1 className="text-3xl font-bold">MY COMPLETED TASKS</h1>

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
                no data to show
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteTasks;
