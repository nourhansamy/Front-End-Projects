import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MasterLayout from "./Components/MasterLayout/MasterLayout";
import Home from "./Components/Home/Home";
import All from "./Components/All/All";
import Categories from "./Components/Categories/Categories";
import Platforms from "./Components/Platforms/Platforms";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import SortBy from "./Components/SortBy/SortBy";
import Details from "./Components/Details/Details";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  const [userData, setUserData] = useState(null); // Decoded Token

  let saveUserData = () => {
    // get token
    let token = localStorage.getItem("token"); //encoded
    let decodedToken = jwtDecode(token); //decoded
    // console.log("decodedToken:", decodedToken);
    setUserData(decodedToken);
  };
  let logOut = () => {
    // Remove Token and delete userData
    setUserData(null);
    localStorage.removeItem("token");
  };
  useEffect(() => {
    // console.log("useEffect Token", localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      // console.log('useEffect if');
      saveUserData();
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout userData={userData} logOut={logOut} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/all",
          element: (
            <ProtectedRoute userData={userData}>
              <All />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Platforms",
          element: (
            <ProtectedRoute userData={userData}>
              <Platforms />
            </ProtectedRoute>
          ),
          children: [
            {
              path: ":platformType",
              element: (
                <ProtectedRoute userData={userData}>
                  <Platforms />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "games/sort-by/:sortByType",
          element: (
            <ProtectedRoute userData={userData}>
              <SortBy />
            </ProtectedRoute>
          ),
        },
        {
          path: "games/Categories/:categoryType",
          element: (
            <ProtectedRoute userData={userData}>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "gameDetails/:gameId",
          element: (
            <ProtectedRoute userData={userData}>
              <Details />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login saveUserData={saveUserData} />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
