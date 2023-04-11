import React, { useContext } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Register from './Pages/Register';
import Home from './Pages/Home';
import Login from './Pages/Login';
import "./style.scss" 

function App() {

  const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      return children;
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
