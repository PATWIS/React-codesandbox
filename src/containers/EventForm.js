import * as React from "react";
import PageHeadline from "../components/PageHeadline";
import Grid from "material-ui/Grid";
import { Cancel, Save } from "../components/Buttons";

import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";

const styles = theme => ({
  root: {
    minHeight: "80vh",
    padding: 10
  },
  paper: {
    height: 150,
    marginTop: 20
    // width: 600
  },
  content: {
    position: "relative"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class EventForm extends React.Component {
  state = {
    isGoing: true,
    name: "",
    mode: ""
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    const { history, match } = this.props;

    console.log(history.location.pathname);
    console.log(history);
    history.location.pathname === "/event/new"
      ? this.setState({
          name: "",
          mode: "new"
        })
      : fetch(`http://localhost:3000/items/${match.params.id}`)
          .then(response => response.json())
          .then(json => {
            this.setState({
              name: json.title,
              mode: "edit"
            });
          });
  }

  addNew = e => {
    e.preventDefault();
    let url = "http://localhost:3000/items";
    let data = { title: this.state.name };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(() => this.props.history.push("/"));
  };

  foo = () => {
    alert(this.state.mode);
  };

  update = e => {
    e.preventDefault();
    const { match } = this.props;
    let url = `http://localhost:3000/items/${match.params.id}`;

    let data = { title: this.state.name };

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(() => this.props.history.push("/"));
  };

  render() {
    const { classes } = this.props;
    const { mode } = this.state;
    return (
      <React.Fragment>
        <Grid className={classes.root} justify="center" container>
          <Grid item xs={12} sm={11} md={8} className={classes.content}>
            <PageHeadline
              name={"Add new event"}
              buttons={[
                <Save
                  onClickHandler={mode === "new" ? this.addNew : this.update}
                  // onClickHandler={this.foo}
                />,
                <Cancel />
              ]}
            />
            <Paper className={classes.paper}>
              <form>
                <label>
                  Name:
                  <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </label>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EventForm);
