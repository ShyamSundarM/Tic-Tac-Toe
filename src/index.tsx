import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import { initializeApp } from "firebase/app";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/Store";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyApbM6Z33UhsNHL0abrjvchfdXipBRQD6A",
  authDomain: "tic-tac-toe-22235.firebaseapp.com",
  projectId: "tic-tac-toe-22235",
  storageBucket: "tic-tac-toe-22235.appspot.com",
  messagingSenderId: "796347971459",
  appId: "1:796347971459:web:467df711d720f2957428b6",
  measurementId: "G-SQZY38Y5SD",
  databaseURL: "https://tic-tac-toe-22235-default-rtdb.firebaseio.com/",
};
export const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
