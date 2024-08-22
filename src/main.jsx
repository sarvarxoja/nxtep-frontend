import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Route } from "react-router-dom";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:1311/";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["x-api-key"] = "Mlk_love";
axios.defaults.headers.common["Content-Type"] = "aplication/json";

let access_token = localStorage.getItem("access_token");
if (access_token)
  axios.defaults.headers.common["access_token"] = `${access_token}`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Route>
    <App />
  </Route>
);
