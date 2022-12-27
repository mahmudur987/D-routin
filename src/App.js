import { RouterProvider } from "react-router-dom";
import "./App.css";
import MyNavbar from "./Components/Navbar/Navbar";
import { routes } from "./Routes/Routes";

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
