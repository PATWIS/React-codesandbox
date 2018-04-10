import React from "react";
import { withStyles } from "material-ui/styles";
import Item from "./Item";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500
  },
  progress: {
    margin: theme.spacing.unit * 2,
    textAlign: "center"
  }
});

class Teams extends React.Component {
  state = {
    teams: [],
    count: 0,
    loading: true
  };

  addNew = e => {
    e.preventDefault();
    let url = "http://localhost:3000/teams";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ name: `Team ${this.state.count + 1}` }), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(json => {
        this.setState(prevState => ({
          teams: [...prevState.teams, json],
          count: prevState.count + 1
        }));
      });
  };

  deleteItem = data => {
    let url = `http://localhost:3000/teams/${data.id}`;

    fetch(url, {
      method: "DELETE"
    }).then(() => {
      this.setState(prevState => ({
        teams: prevState.teams.filter(el => el.id !== data.id),
        count: prevState.count - 1
      }));
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/teams")
      .then(response => response.json())
      .catch(e => {
        this.setState({
          loading: false
        });
      })
      .then(json => {
        this.setState({
          teams: json,
          count: json.length,
          loading: false
        });
      });
  }

  render() {
    const { history, classes, login } = this.props;
    const { teams, loading } = this.state;

    return (
      <div>
        {loading ? (
          <div className={classes.root}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : teams ? (
          Object.keys(teams).length === 0 && teams.constructor === Object ? (
            <p>
              Please check if have you created "teams" object in your local
              db.json
            </p>
          ) : teams.length === 0 ? (
            <p> There are no elements, please add new item.</p>
          ) : (
            <ul>
              {teams.map(e => (
                <li onClick={this.deleteItem.bind(this, e)} key={e.id}>
                  {e.name}
                </li>
              ))}
            </ul>
          )
        ) : (
          <div>
            <p>
              This App uses JSON-server API. Please, run json-server on
              localhost:3000.
            </p>
            <ul>
              <li>npm install json-server</li>
              <li>Create a db.json file</li>

              <li>copy content from public/db.json.</li>
              <li>json-server --watch db.json</li>
            </ul>
            <p>
              You can find more info here:
              https://github.com/typicode/json-server
            </p>
          </div>
        )}
        <Button onClick={this.addNew}>Add new team</Button>
      </div>
    );
  }
}

export default withStyles(styles)(Teams);
