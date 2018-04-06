import React from "react";
import { render } from "react-dom";
import Home from "./containers/Home";
import ItemForm from "./containers/ItemForm";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "material-ui/CssBaseline";

const App = () => (
  <Router>
    <div className="container">
      <CssBaseline />
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/add-new" component={ItemForm} />
      <Route path="/item/:id" component={ItemForm} />
    </div>
  </Router>
);

render(<App />, document.getElementById("root"));
