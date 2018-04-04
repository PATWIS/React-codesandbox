import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";

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
    const { classes, data } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography className={classes.flex} variant="title" gutterBottom>
          {data.title}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Event);
