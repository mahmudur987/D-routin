import { createBrowserRouter } from "react-router-dom";
import AddTask from "../Components/AddTask/AddTask";
import CompleteTasks from "../Components/CopleteTask/CompleteTasks";
import MyTasks from "../Components/MyTask/MyTasks";
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
    ],
  },
]);
