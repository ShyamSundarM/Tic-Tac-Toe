import React from "react";
import styles from "./App.module.css";
import HomePage from "./HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GamePage from "./GamePage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "GamePage",
    Component: GamePage,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
