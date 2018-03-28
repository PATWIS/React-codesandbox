import React from "react";
import { render } from "react-dom";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <Router>
    <div className="container">
      <Header />
    </div>
  </Router>
);

render(<App />, document.getElementById("root"));
