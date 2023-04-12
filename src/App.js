import React, { useContext } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Register from './Pages/Register';
import Home from './Pages/Home';
import Login from './Pages/Login';
import "./style.scss" 

function App() {

  const { currentUser, loading } = useContext(AuthContext);

  const PrivateRoute = ({ children }) => {
    if(loading || currentUser === undefined){
      return <div>Loading...</div>
    }
    if (currentUser?.uid) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Home></Home>
        </PrivateRoute>
      )
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return <RouterProvider router={routes} ></RouterProvider>;
}

export default App;
