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
    name: ""
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  fooClick = () => {
    alert("fooClick");
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.root} justify="center" container>
          <Grid item xs={12} sm={11} md={8} className={classes.content}>
            <PageHeadline
              name={"Add new event"}
              buttons={[<Save onClickHandler={this.fooClick} />, <Cancel />]}
            />
            <Paper className={classes.paper}>
              <form>
                <label>
                  Is going:
                  <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.isGoing}
                    onChange={this.handleInputChange}
                  />
                </label>
                <br />
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
