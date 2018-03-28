import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <Router>
    <div className="container">
      <Nav />
    </div>
  </Router>
);

render(<App />, document.getElementById("root"));
