import { Card } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreament, increament } from "../../Redux/State/Counter/CounterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <div className="w-3/4 mx-auto">
        <Card>
          <div>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Counter
            </h5>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {count}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => dispatch(increament())}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Increase
            </button>
            <button
              onClick={() => dispatch(decreament())}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Dicrease
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Counter;
