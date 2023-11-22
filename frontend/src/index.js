import React from "react";
import ReactDOM from "react-dom/client";
import "bulma/css/bulma.css";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./admin/context/context";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { HomeContextProvider } from "./context/context";
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <HomeContextProvider>
          <App />
        </HomeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
