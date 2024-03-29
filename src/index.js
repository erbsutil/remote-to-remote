import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import CreatePlace from "./CreatePlace";

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/novo" component={CreatePlace} />
    </div>
  </Router>,
  document.getElementById("root")
);
