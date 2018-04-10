import React from "react";
import { render } from "react-dom";
import Home from "./containers/Home";
import ItemForm from "./containers/ItemForm";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "material-ui/CssBaseline";

class App extends React.Component {
  state = {
    login: true
  };
  loginHandler = () => {
    alert("implementation in progress");
    this.setState(prevState => {
      return {
        login: !prevState.login
      };
    });
  };
  render() {
    const { login } = this.state;
    return (
      <Router>
        <div className="container">
          <CssBaseline />
          <Header login={login} loginHandler={this.loginHandler} />
          <Route
            exact
            path="/"
            render={props => <Home {...props} login={login} />}
          />
          <Route
            path="/add-new"
            render={props => <ItemForm {...props} login={login} addNew />}
          />

          <Route
            path="/item/:id"
            render={props => <ItemForm {...props} login={login} />}
          />
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
