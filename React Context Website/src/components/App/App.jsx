import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import { useContext } from "react";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Details from "../Details/Details";
import { Offline, Online } from "react-detect-offline";
import MediaContextProvider from "../Context/MediaContext";
import AuthContextProvider, { AuthContext } from "../Context/AuthContext";

function App() {
  let { userData, saveUserData, logout } = useContext(AuthContext);
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

  return (
    <>
      <div>
        <Online>
          <RouterProvider router={routes} />
        </Online>
        <Offline>
          <h1 className="text-center mt-5">You Are Offline!</h1>
        </Offline>
      </div>
    </>
  );
}

export default App;
