import {
  createBrowserRouter,
  // Navigate,
  // redirect,
  RouterProvider,
  // useNavigate,
} from "react-router-dom";
import MasterLayout from "../MasterLayout/MasterLayout";
import "./App.css";
import NotFound from "../NotFound/NotFound";
import Home from "../Home/Home";
import About from "../About/About";
import Movies from "../Movies/Movies";
import TVshows from "../TVshows/TVshows";
import People from "../People/People";
import Register from "../Register/Register";
import Login from "../Login/Login";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Details from "../Details/Details";
import { Offline, Online } from "react-detect-offline";

function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    // 1. Get data from local storage
    let encodedToken = localStorage.getItem("token");
    // 2. Decode
    let decodedToken = jwtDecode(encodedToken);
    console.log("decodedToken:", decodedToken);
    // 3. Store decodedToken info in state
    setUserData(decodedToken);
  }
  function logout() {
    // 1. Remove token from local storage
    localStorage.removeItem("token");
    // 2. Clear userData in state
    setUserData(null);
    // 3. Navigate the user to login page
    // return <Navigate to="/login" />;
  }
  // Routes
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout userData={userData} logout={logout} />,
      errorElement: <NotFound />,
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
          path: "movies",
          element: (
            <ProtectedRoute userData={userData}>
              <Movies />
            </ProtectedRoute>
          ),
        },
        {
          path: "tvshows",
          element: (
            <ProtectedRoute userData={userData}>
              <TVshows />
            </ProtectedRoute>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectedRoute userData={userData}>
              <People />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute userData={userData}>
              <Profile userData={userData} />
            </ProtectedRoute>
          ),
        },
        {
          path: "details/:id/:mediaType",
          element: (
            <ProtectedRoute userData={userData}>
              <Details userData={userData} />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: <About />,
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
      ],
    },
  ]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);

  return (
    <>
      <div>
        <Online>
          <RouterProvider router={routes} />
        </Online>
        <Offline><h1 className="text-center mt-5">You Are Offline!</h1></Offline>
      </div>
    </>
  );
}

export default App;
