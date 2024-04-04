import React from "react";
import styles from "./App.module.css";
import HomePage from "./HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GamePage from "./GamePage";
import RoomScreen from "./RoomScreen";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "GamePage",
    Component: GamePage,
  },
  {
    path: "Room",
    Component: RoomScreen,
  },
]);

function App() {
  return (
    <div className={styles.Root}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
