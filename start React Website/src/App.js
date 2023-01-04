// import "./App.css";
import React, { Component } from "react";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Portfolio from "./components/Portfolio/Portfolio";
export default class App extends Component {
  routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      // errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "portfolio",
          element: <Portfolio />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ]);
  render() {
    return <>
      <RouterProvider router={this.routes} />
    </>;
  }
}
