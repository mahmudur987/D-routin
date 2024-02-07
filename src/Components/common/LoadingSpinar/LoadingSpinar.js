import React from "react";
import { Spinner } from "flowbite-react";

const LoadingSpinar = () => {
  return (
    <div className="flex items-center w-full h-96 justify-center dark:bg-slate-900 dark:text-white  ">
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
  );
};

export default LoadingSpinar;
