import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    flex: 1
  },
  paper: {
    height: 150,
    marginTop: 20
    // width: 600
  },
  title: {
    padding: 20
  }
});

class Event extends React.Component {
  goToEdit = () => {
    const { data } = this.props;
    this.props.history.push(`/event/${data.id}`);
  };

  render() {
    const { classes, data } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="title" gutterBottom>
          Title: {data.title}
        </Typography>
        <Button
          color="inherit"
          onClick={this.goToEdit}
          className={classes.flex}
        >
          Details
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(Event);
