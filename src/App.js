import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./Firebase/Firebase.config";
import { createContext, useEffect, useState } from "react";

const auth = getAuth(app);
const queryClient = new QueryClient();
export const userContext = createContext("");
function App() {
  const [user, Setuser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      Setuser(currentUser);

      console.log("currentuser", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = { user };

  return (
    <userContext.Provider value={authInfo}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Toaster></Toaster>
          <RouterProvider router={routes}></RouterProvider>
        </div>
      </QueryClientProvider>
    </userContext.Provider>
  );
}

export default App;
