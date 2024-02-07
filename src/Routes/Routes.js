import { createBrowserRouter } from "react-router-dom";

import CounterPage from "../CounterPage/CounterPage";
import Main from "../Layouts/Main";
import AddTask from "../pages/AddTask/AddTask";
import MyTasks from "../pages/MyTask/MyTasks";
import CompleteTasks from "../pages/CompleteTask/CompleteTasks";
import LogIn from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <AddTask />,
      },
      {
        path: "/mytask",
        element: <MyTasks />,
      },
      {
        path: "/completetask",
        element: <CompleteTasks />,
      },
      {
        path: "/counter",
        element: <CounterPage />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "*",
        element: (
          <div>
            <h1 className="text-5xl text-center font-bold">
              This page is under Maintanence
            </h1>
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div>
        <h1 className="text-5xl text-center font-bold">
          This page is under Maintanence
        </h1>
      </div>
    ),
  },
]);
