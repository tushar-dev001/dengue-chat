import React from "react";
import ReactDOM from "react-dom/client";
import firebaseConfig from "./firebaseConfig/firebase.config.js";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
