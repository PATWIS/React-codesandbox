import * as React from "react";
import PageHeadline from "../components/PageHeadline";
import Grid from "material-ui/Grid";
import { Cancel, Save } from "../components/Buttons";
import TextField from "material-ui/TextField";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Item from "../models/Item";

const styles = theme => ({
  root: {
    minHeight: "80vh",
    padding: 10
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  paper: {
    minHeight: 150,
    marginTop: 20,
    padding: 15
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

class ItemForm extends React.Component {
  state = {
    data: new Item(),
    mode: ""
  };

  // handleChange = name => event => {
  //   this.setState({
  //     data: { ...this.state.data, [name]: event.target.value }
  //   });
  // };

  handleChange = item => {
    const target = item.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    // this.setState({
    //   data: { ...this.state.data, [name]: value }
    // });
    this.setState(prevState => {
      return { data: { ...prevState.data, [name]: value } };
    });
  };

  componentDidMount() {
    const { history, match } = this.props;

    history.location.pathname === "/add-new"
      ? this.setState({
          data: {},
          mode: "new"
        })
      : fetch(`http://localhost:3000/items/${match.params.id}`)
          .then(response => response.json())
          .then(json => {
            this.setState({
              data: json,
              mode: "edit"
            });
          });
  }

  addNew = e => {
    e.preventDefault();
    let url = "http://localhost:3000/items";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(this.state.data), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(() => this.props.history.push("/"));
  };

  update = e => {
    e.preventDefault();
    const { match } = this.props;
    let url = `http://localhost:3000/items/${match.params.id}`;

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(this.state.data), // data can be `string` or {object}!
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
              name={mode === "new" ? "Add new item" : "Edit item"}
              buttons={[
                <Save
                  onClickHandler={mode === "new" ? this.addNew : this.update}
                />,
                <Cancel />
              ]}
            />

            {mode === "details" ? (
              <p>detale</p>
            ) : (
              <Paper className={classes.paper}>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="name"
                    label="Name"
                    className={classes.textField}
                    value={this.state.data.name}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <TextField
                    id="desc"
                    label="Description"
                    multiline
                    className={classes.textField}
                    value={this.state.data.desc}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </form>
              </Paper>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ItemForm);
