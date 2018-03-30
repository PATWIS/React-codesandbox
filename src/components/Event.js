import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";

const styles = theme => ({
  root: {
    flex: 1
  },
  paper: {
    height: 150,
    marginTop: 20
    // width: 600
  }
});

class Event extends React.Component {
  render() {
    const { classes } = this.props;
    return <Paper className={classes.paper} />;
  }
}

export default withStyles(styles)(Event);
