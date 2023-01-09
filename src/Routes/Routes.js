import { createBrowserRouter } from "react-router-dom";
import AddTask from "../Components/AddTask/AddTask";
import CompleteTasks from "../Components/CopleteTask/CompleteTasks";
import Login from "../Components/Login/Login";
import MyTasks from "../Components/MyTask/MyTasks";
import SignUp from "../Components/SignUp/SignUp";
import CounterPage from "../CounterPage/CounterPage";
import Main from "../Layouts/Main";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <AddTask></AddTask>,
      },
      {
        path: "/mytask",
        element: <MyTasks></MyTasks>,
      },
      {
        path: "/completetask",
        element: <CompleteTasks></CompleteTasks>,
      },
      {
        path: "/counter",
        element: <CounterPage></CounterPage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
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
