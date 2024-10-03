import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Route } from "react-router-dom";

import axios from "axios";
import store from "./store";

axios.defaults.baseURL = "http://localhost:2310/";
axios.defaults.headers.common["x-api-key"] = "love_next_step";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "aplication/json";

let access_token = localStorage.getItem("access_token");
if (access_token)
  axios.defaults.headers.common["access_token"] = `${access_token}`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Route>
      <App />
    </Route>
  </Provider>
);
